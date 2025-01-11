<?php

namespace App\DataFixtures;

use App\Entity\Book;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class BookFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $book1 = new Book();
        $book1->setName('Le Seigneur des Anneaux');
        $book1->setDescription('Une épopée fantastique écrite par J.R.R. Tolkien');
        $book1->setCategoryId('1');
        $book1->setPages(1178);
        $book1->setPublicationDate(new \DateTime('1954-07-29'));
        $book1->setCreatedAt(new \DateTime());
        $book1->setUpdatedAt(new \DateTime());
        $manager->persist($book1);

        $book2 = new Book();
        $book2->setName('1984');
        $book2->setDescription('Un roman dystopique de George Orwell');
        $book2->setCategoryId('2');
        $book2->setPages(328);
        $book2->setPublicationDate(new \DateTime('1949-06-08'));
        $book2->setCreatedAt(new \DateTime());
        $book2->setUpdatedAt(new \DateTime());
        $manager->persist($book2);

        $manager->flush();
    }
}
