<?php

namespace App\DataFixtures;

use App\Entity\Category;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class CategoryFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $categories = [
            'Roman' => 'Livres de fiction narratifs',
            'Science-Fiction' => 'Œuvres d\'anticipation et de fiction spéculative',
            'Policier' => 'Romans d\'enquête et de mystère',
            'Biographie' => 'Récits de vie de personnalités',
            'Histoire' => 'Livres sur des événements historiques',
            'Science' => 'Ouvrages scientifiques et techniques',
            'Philosophie' => 'Œuvres de réflexion philosophique',
            'Art' => 'Livres sur l\'art et les artistes'
        ];

        foreach ($categories as $name => $description) {
            $category = new Category();
            $category->setName($name);
            $category->setDescription($description);
            $category->setCreatedAt(new \DateTime());
            $category->setUpdatedAt(new \DateTime());
            
            $manager->persist($category);
        }

        $manager->flush();
    }
}
