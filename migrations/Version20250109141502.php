<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20250109141502 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Création de la table user_book';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('CREATE TABLE user_book (
            id INT AUTO_INCREMENT NOT NULL,
            user_id INT NOT NULL,
            book_id INT NOT NULL,
            notes LONGTEXT DEFAULT NULL,
            rating DECIMAL(2,1) DEFAULT NULL,
            is_finished TINYINT(1) NOT NULL DEFAULT 0,
            created_at DATETIME NOT NULL,
            updated_at DATETIME NOT NULL,
            INDEX IDX_B164EFF8A76ED395 (user_id),
            INDEX IDX_B164EFF816A2B381 (book_id),
            PRIMARY KEY(id)
        ) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        
        $this->addSql('ALTER TABLE user_book ADD CONSTRAINT FK_B164EFF8A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE user_book ADD CONSTRAINT FK_B164EFF816A2B381 FOREIGN KEY (book_id) REFERENCES book (id)');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('DROP TABLE user_book');
    }
}
