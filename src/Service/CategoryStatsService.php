<?php

namespace App\Service;

use App\Repository\CategoryRepository;
use App\Repository\UserBookRepository;
use Symfony\Component\Security\Core\User\UserInterface;

class CategoryStatsService
{
    public function __construct(
        private CategoryRepository $categoryRepository,
        private UserBookRepository $userBookRepository
    ) {
    }

    public function getCategoryStats(UserInterface $user): array
    {
        $categories = $this->categoryRepository->findAll();
        $userBooks = $this->userBookRepository->findByUserAndStatus($user, true);
        
        $categoryStats = [
            'labels' => [],
            'data' => []
        ];

        // Initialiser les compteurs pour chaque catégorie
        $categoryCounters = [];
        foreach ($categories as $category) {
            $categoryStats['labels'][] = $category->getName();
            $categoryCounters[$category->getId()] = 0;
        }

        // Compter les livres par catégorie
        foreach ($userBooks as $userBook) {
            $book = $userBook->getBook();
            if ($book) {
                $categoryId = $book->getCategoryId();
                if (isset($categoryCounters[$categoryId])) {
                    $categoryCounters[$categoryId]++;
                }
            }
        }

        // Convertir les compteurs en tableau de données
        $categoryStats['data'] = array_values($categoryCounters);

        return $categoryStats;
    }
}
