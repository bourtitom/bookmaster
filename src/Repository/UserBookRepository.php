<?php

namespace App\Repository;

use App\Entity\User;
use App\Entity\UserBook;
use App\Entity\Book; 
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<UserBook>
 *
 * @method UserBook|null find($id, $lockMode = null, $lockVersion = null)
 * @method UserBook|null findOneBy(array $criteria, array $orderBy = null)
 * @method UserBook[]    findAll()
 * @method UserBook[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserBookRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, UserBook::class);
    }

    /**
     * @return UserBook[]
     */
    public function findByUserAndStatus(User $user, bool $isFinished): array
    {
        return $this->createQueryBuilder('ub')
            ->select('DISTINCT ub')
            ->andWhere('ub.user = :user')
            ->andWhere('ub.isFinished = :isFinished')
            ->setParameter('user', $user)
            ->setParameter('isFinished', $isFinished)
            ->orderBy('ub.createdAt', 'DESC')
            ->getQuery()
            ->getResult();
    }

    public function findByUserAndBook(User $user, Book $book): ?UserBook
    {
        return $this->createQueryBuilder('ub')
            ->andWhere('ub.user = :user')
            ->andWhere('ub.book = :book')
            ->setParameter('user', $user)
            ->setParameter('book', $book)
            ->getQuery()
            ->getOneOrNullResult();
    }
}
