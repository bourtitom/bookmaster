<?php

namespace App\Controller;

use App\Entity\UserBook;
use App\Form\UserBookType;
use App\Repository\UserBookRepository;
use App\Service\CategoryStatsService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

class HomeController extends AbstractController
{
    public function __construct(
        private UserBookRepository $userBookRepository,
        private CategoryStatsService $categoryStatsService
    ) {
    }

    #[Route('/', name: 'app_home')]
    #[IsGranted('ROLE_USER')]
    public function index(): Response
    {
        // Récupérer l'utilisateur connecté
        $user = $this->getUser();
        if (!$user) {
            return $this->redirectToRoute('app_login');
        }

        try {
            $booksReading = $this->userBookRepository->findByUserAndStatus($user, false);
            $booksRead = $this->userBookRepository->findByUserAndStatus($user, true);
            $categoryStats = $this->categoryStatsService->getCategoryStats($user);
        } catch (\Exception $e) {
            $this->addFlash('error', 'Une erreur est survenue lors de la récupération de vos livres.');
            $booksReading = [];
            $booksRead = [];
            $categoryStats = ['labels' => [], 'data' => []];
        }

        // Créer le formulaire pour l'ajout de livre
        $userBook = new UserBook();
        $form = $this->createForm(UserBookType::class, $userBook);

        return $this->render('pages/home.html.twig', [
            'booksReading' => $booksReading,
            'booksRead' => $booksRead,
            'form' => $form->createView(),
            'categoryStats' => $categoryStats
        ]);
    }
}
