<?php

namespace App\Controller;

use App\Entity\UserBook;
use App\Form\UserBookType;
use App\Repository\UserBookRepository;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/user/book')]
#[IsGranted('ROLE_USER')]
class UserBookController extends AbstractController
{
    public function __construct(
        private LoggerInterface $logger,
        private UserBookRepository $userBookRepository
    ) {
    }

    #[Route('/{id}', name: 'app_user_book_get', methods: ['GET'])]
    public function get(UserBook $userBook): JsonResponse
    {
        // Vérifier que l'utilisateur est propriétaire du livre
        if ($userBook->getUser() !== $this->getUser()) {
            throw $this->createAccessDeniedException('Vous n\'êtes pas autorisé à accéder à ce livre');
        }

        return new JsonResponse([
            'success' => true,
            'book' => [
                'id' => $userBook->getId(),
                'bookId' => $userBook->getBook()->getId(),
                'title' => $userBook->getBook()->getName(),
                'notes' => $userBook->getNotes(),
                'rating' => $userBook->getRating(),
                'isFinished' => $userBook->isFinished(),
            ]
        ]);
    }

    #[Route('/add', name: 'app_user_book_add', methods: ['POST'])]
    public function add(Request $request, EntityManagerInterface $entityManager, ValidatorInterface $validator): JsonResponse
    {
        try {
            $content = $request->getContent();
            $this->logger->debug('Headers de la requête:', $request->headers->all());
            $this->logger->debug('Contenu brut de la requête:', [$content]);
            
            $data = json_decode($content, true);
            if (!$data) {
                $jsonError = json_last_error_msg();
                $this->logger->error('Erreur de décodage JSON: ' . $jsonError);
                throw new \Exception('Données JSON invalides: ' . $jsonError);
            }
            $this->logger->debug('Données JSON décodées:', $data);
            
            $userBook = new UserBook();
            $form = $this->createForm(UserBookType::class, $userBook);
            
            // Ajouter le préfixe user_book aux données
            $formData = ['user_book' => $data];
            $this->logger->debug('Données du formulaire avant soumission:', $formData);
            
            // Soumettre le formulaire sans validation CSRF
            $form->submit($formData['user_book'], false);

            // Log des données après soumission
            $this->logger->debug('État de l\'entité après soumission:', [
                'book' => $userBook->getBook()?->getId(),
                'notes' => $userBook->getNotes(),
                'rating' => $userBook->getRating(),
                'isFinished' => $userBook->isFinished()
            ]);

            // Valider l'entité
            $errors = $validator->validate($userBook);
            if (count($errors) > 0) {
                $errorMessages = [];
                foreach ($errors as $error) {
                    $errorMessages[] = sprintf(
                        'Champ %s: %s',
                        $error->getPropertyPath(),
                        $error->getMessage()
                    );
                    $this->logger->error('Erreur de validation:', [
                        'field' => $error->getPropertyPath(),
                        'message' => $error->getMessage(),
                        'value' => $error->getInvalidValue()
                    ]);
                }
                return new JsonResponse([
                    'success' => false,
                    'errors' => $errorMessages
                ], Response::HTTP_BAD_REQUEST);
            }

            // Valider le formulaire
            if (!$form->isValid()) {
                $formErrors = [];
                foreach ($form->getErrors(true) as $error) {
                    $formErrors[] = sprintf(
                        'Champ %s: %s',
                        $error->getOrigin()?->getName() ?? 'inconnu',
                        $error->getMessage()
                    );
                    $this->logger->error('Erreur de formulaire:', [
                        'field' => $error->getOrigin()?->getName(),
                        'message' => $error->getMessage()
                    ]);
                }
                return new JsonResponse([
                    'success' => false,
                    'errors' => $formErrors
                ], Response::HTTP_BAD_REQUEST);
            }

            $user = $this->getUser();
            if (!$user) {
                throw new \Exception('Utilisateur non connecté');
            }
            
            // Supprimer les anciens enregistrements pour ce livre
            $existingUserBooks = $this->userBookRepository->findBy([
                'user' => $user,
                'book' => $userBook->getBook()
            ]);
            
            foreach ($existingUserBooks as $existingBook) {
                $entityManager->remove($existingBook);
            }
            $entityManager->flush();
            
            // Ajouter le nouveau livre
            $userBook->setUser($user);
            $entityManager->persist($userBook);
            $entityManager->flush();

            // Rendre le template de la ligne
            $html = $this->renderView('components/home/_book_row.html.twig', [
                'userBook' => $userBook
            ]);

            return new JsonResponse([
                'success' => true,
                'message' => 'Livre ajouté avec succès',
                'book' => [
                    'id' => $userBook->getId(),
                    'title' => $userBook->getBook()->getName(),
                    'notes' => $userBook->getNotes(),
                    'rating' => $userBook->getRating(),
                    'isFinished' => $userBook->isFinished(),
                ],
                'html' => $html
            ]);
            
        } catch (\Exception $e) {
            $this->logger->error('Exception lors de l\'ajout du livre:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return new JsonResponse([
                'success' => false,
                'errors' => [$e->getMessage()]
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    #[Route('/{id}', name: 'app_user_book_edit', methods: ['POST'])]
    public function edit(Request $request, UserBook $userBook, EntityManagerInterface $entityManager, ValidatorInterface $validator): JsonResponse
    {
        // Vérifier que l'utilisateur est propriétaire du livre
        if ($userBook->getUser() !== $this->getUser()) {
            throw $this->createAccessDeniedException('Vous n\'êtes pas autorisé à modifier ce livre');
        }

        try {
            $content = $request->getContent();
            $data = json_decode($content, true);
            if (!$data) {
                throw new \Exception('Données JSON invalides');
            }

            $form = $this->createForm(UserBookType::class, $userBook);
            $formData = ['user_book' => $data];
            $form->submit($formData['user_book'], false);

            if (!$form->isValid()) {
                $errors = [];
                foreach ($form->getErrors(true) as $error) {
                    $errors[] = $error->getMessage();
                }
                return new JsonResponse([
                    'success' => false,
                    'errors' => $errors
                ], Response::HTTP_BAD_REQUEST);
            }

            $entityManager->flush();

            // Rendre le template de la ligne
            $html = $this->renderView('components/home/_book_row.html.twig', [
                'userBook' => $userBook
            ]);

            return new JsonResponse([
                'success' => true,
                'message' => 'Livre mis à jour avec succès',
                'book' => [
                    'id' => $userBook->getId(),
                    'title' => $userBook->getBook()->getName(),
                    'notes' => $userBook->getNotes(),
                    'rating' => $userBook->getRating(),
                    'isFinished' => $userBook->isFinished(),
                ],
                'html' => $html
            ]);

        } catch (\Exception $e) {
            return new JsonResponse([
                'success' => false,
                'errors' => [$e->getMessage()]
            ], Response::HTTP_BAD_REQUEST);
        }
    }
}
