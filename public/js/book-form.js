document.addEventListener('DOMContentLoaded', function() {
    console.log('Script chargé');
    const form = document.getElementById('user-book-form');
    if (!form) {
        console.error('Formulaire non trouvé');
        return;
    }
    
    let isSubmitting = false; // Flag pour éviter la double soumission
    let currentBookId = null; // ID du livre en cours d'édition
    
    // Gérer le clic sur un livre
    const bookLinks = document.querySelectorAll('.book-edit');
    console.log('Nombre de liens trouvés:', bookLinks.length);
    
    bookLinks.forEach(link => {
        console.log('Ajout du listener sur:', link.textContent.trim(), 'avec ID:', link.dataset.bookId);
        link.addEventListener('click', async function(e) {
            console.log('Clic sur le livre:', this.dataset.bookId);
            e.preventDefault();
            const bookId = this.dataset.bookId;
            currentBookId = bookId;
            
            try {
                console.log('Récupération du livre:', bookId);
                const response = await fetch(`/user/book/${bookId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                const data = await response.json();
                console.log('Données reçues:', data);
                
                if (!response.ok) {
                    throw new Error(data.errors ? data.errors.join('\n') : 'Erreur lors de la récupération du livre');
                }
                
                // Remplir le formulaire avec les données du livre
                const bookSelect = form.querySelector('[name="user_book[book]"]');
                const ratingInput = form.querySelector('[name="user_book[rating]"]');
                const isFinishedInput = form.querySelector('[name="user_book[isFinished]"]');
                const notesInput = form.querySelector('[name="user_book[notes]"]');
                
                console.log('Éléments du formulaire:', {
                    bookSelect: bookSelect ? 'trouvé' : 'non trouvé',
                    ratingInput: ratingInput ? 'trouvé' : 'non trouvé',
                    isFinishedInput: isFinishedInput ? 'trouvé' : 'non trouvé',
                    notesInput: notesInput ? 'trouvé' : 'non trouvé'
                });
                
                if (bookSelect) bookSelect.value = data.book.bookId;
                if (ratingInput) ratingInput.value = data.book.rating || '';
                if (isFinishedInput) isFinishedInput.checked = data.book.isFinished;
                if (notesInput) notesInput.value = data.book.notes || '';
                
                const modal = document.getElementById('book_modal');
                console.log('Modal trouvé:', modal ? 'oui' : 'non');
                if (modal) {
                    // Créer d'abord le backdrop
                    let backdrop = document.querySelector('.modal-backdrop');
                    if (!backdrop) {
                        backdrop = document.createElement('div');
                        backdrop.className = 'modal-backdrop';
                        document.body.appendChild(backdrop);
                    }
                    
                    // Afficher le modal
                    modal.className = 'modal open';
                    modal.classList.remove('hidden');
                    modal.style.zIndex = '1055';
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';

                    // Fermer le modal quand on clique en dehors du contenu
                    modal.addEventListener('click', (event) => {
                        if (event.target === modal) {
                            modal.classList.remove('open');
                            modal.classList.add('hidden');
                            document.body.style.overflow = '';
                            const backdrop = document.querySelector('.modal-backdrop');
                            if (backdrop) {
                                backdrop.remove();
                            }
                            setTimeout(() => {
                                modal.style.display = '';
                            }, 150);
                        }
                    });
                }
            } catch (error) {
                console.error('Erreur:', error);
                alert('Une erreur est survenue lors de la récupération du livre: ' + error.message);
            }
        });
    });
    
    // Gérer la fermeture du modal
    document.querySelectorAll('[data-modal-close]').forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal-close');
            const modal = document.querySelector(modalId);
            if (modal) {
                modal.classList.remove('open');
                modal.classList.add('hidden');
                document.body.style.overflow = '';
                
                const backdrop = document.querySelector('.modal-backdrop');
                if (backdrop) {
                    backdrop.remove();
                }
                setTimeout(() => {
                    modal.style.display = '';
                }, 150);
            }
        });
    });
    
    console.log('Formulaire trouvé');
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (isSubmitting) {
            console.log('Formulaire déjà en cours de soumission');
            return;
        }
        
        isSubmitting = true;
        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.disabled = true;
        }

        // Récupérer uniquement les champs autorisés
        const data = {
            isFinished: form.querySelector('[name="user_book[isFinished]"]').checked
        };
        
        // Ajouter les champs optionnels seulement s'ils ont une valeur
        const bookInput = form.querySelector('[name="user_book[book]"]');
        const ratingInput = form.querySelector('[name="user_book[rating]"]');
        const notesInput = form.querySelector('[name="user_book[notes]"]');

        if (bookInput && bookInput.value) {
            data.book = bookInput.value;
        }
        if (ratingInput && ratingInput.value) {
            data.rating = ratingInput.value;
        }
        if (notesInput && notesInput.value) {
            data.notes = notesInput.value;
        }
        
        console.log('Données à envoyer:', data);

        try {
            const url = currentBookId ? `/user/book/${currentBookId}` : '/user/book/add';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            console.log('Réponse reçue:', response);
            const responseData = await response.json();
            console.log('Données reçues:', responseData);
            console.log('Response complète:', responseData);

            if (!response.ok) {
                if (responseData.errors && responseData.errors.length > 0) {
                    alert(responseData.errors.join('\n'));
                } else {
                    throw new Error('Erreur serveur: ' + response.status);
                }
                return;
            }
            
            if (responseData.success) {
                const modal = document.getElementById('book_modal');
                if (modal) {
                    modal.classList.remove('open');
                    modal.classList.add('hidden');
                    document.body.style.overflow = '';
                    
                    const backdrop = document.querySelector('.modal-backdrop');
                    if (backdrop) {
                        backdrop.remove();
                    }
                    setTimeout(() => {
                        modal.style.display = '';
                    }, 150);
                }
                
                const isFinished = form.querySelector('[name="user_book[isFinished]"]').checked;
                console.log('État isFinished:', isFinished);
                
                // Supprimer de l'ancienne table
                const oldTableId = currentBookId ? (isFinished ? 'read-books-table' : 'current-books-table') : null;
                if (oldTableId) {
                    const oldTable = document.querySelector(`#${oldTableId} tbody`);
                    if (oldTable) {
                        console.log('Recherche de la ligne à supprimer avec ID:', responseData.book.id);
                        const oldRow = oldTable.querySelector(`a[data-book-id="${responseData.book.id}"]`)?.closest('tr');
                        if (oldRow) {
                            console.log('Suppression de la ligne de la table:', oldTableId);
                            oldRow.remove();
                        } else {
                            console.log('Ligne non trouvée dans la table:', oldTableId);
                        }
                    }
                }

                // Ajouter à la nouvelle table (ou la même table si on ne change pas de statut)
                const targetTableId = isFinished ? 'read-books-table' : 'current-books-table';
                console.log('Table cible:', targetTableId);
                const targetTable = document.querySelector(`#${targetTableId} tbody`);
                
                if (targetTable) {
                    const newRow = document.createElement('tr');
                    // Extraire les données correctement selon la structure de la réponse
                    const bookData = responseData.book || responseData;
                    
                    // Ajouter la date actuelle si elle n'existe pas
                    if (!bookData.updatedAt) {
                        bookData.updatedAt = new Date().toISOString();
                    }

                    console.log('Response complète:', JSON.stringify(responseData, null, 2));
                    console.log('BookData après extraction:', bookData);
                    console.log('Book name:', bookData.book?.name);
                    console.log('Dates disponibles:', {
                        createdAt: bookData.createdAt,
                        updatedAt: bookData.updatedAt,
                        created_at: bookData.created_at,
                        updated_at: bookData.updated_at,
                        date: bookData.date,
                        modifiedAt: bookData.modifiedAt,
                        modified_at: bookData.modified_at,
                        modified: bookData.modified
                    });

                    const getBookTitle = (data) => {
                        if (data.book && data.book.name) {
                            return data.book.name;
                        }
                        if (data.title) {  
                            return data.title;
                        }
                        if (data.name) {
                            return data.name;
                        }
                        return 'Aucun titre';
                    };

                    const formatDate = (dateString) => {
                        if (!dateString) return '';
                        try {
                            const date = new Date(dateString);
                            if (isNaN(date.getTime())) return '';
                            
                            // Ajouter une heure pour compenser le décalage
                            date.setHours(date.getHours() - 1);
                            
                            // Formater la date et l'heure séparément
                            const dateOptions = {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                            };
                            
                            const timeOptions = {
                                hour: '2-digit',
                                minute: '2-digit'
                            };
                            
                            const datePart = date.toLocaleDateString('fr-FR', dateOptions);
                            const timePart = date.toLocaleTimeString('fr-FR', timeOptions);
                            
                            // Combiner avec un 'à'
                            return `${datePart} à ${timePart}`;
                        } catch (e) {
                            console.error('Erreur de formatage de date:', e);
                            return 'Aucune Date';
                        }
                    };

                    const getDate = (data) => {
                        if (data.created_at) return data.created_at;
                        if (data.updated_at) return data.updated_at;
                        if (data.createdAt) return data.createdAt;
                        if (data.updatedAt) return data.updatedAt;
                        return 'Aucune Date';
                    };

                    const generateRatingStars = (rating) => {
                        let starsHtml = '<div class="rating">';
                        for (let i = 1; i <= 5; i++) {
                            starsHtml += `
                                <div class="rating-label ${i <= rating ? 'checked' : ''}">
                                    <i class="rating-on ki-solid ki-star text-base leading-none"></i>
                                    <i class="rating-off ki-outline ki-star text-base leading-none"></i>
                                </div>`;
                        }
                        starsHtml += '</div>';
                        return starsHtml;
                    };

                    // Construire le HTML de base avec le titre et les notes
                    const baseHtml = `
                        <td>
                            <div class="flex flex-col gap-2">
                                <a class="leading-none font-medium text-sm text-gray-900 hover:text-primary book-edit"
                                   href="#"
                                   data-book-id="${bookData.id}">
                                    ${getBookTitle(bookData)}
                                </a>
                                <span class="text-2sm text-gray-700 font-normal leading-3">
                                    ${bookData.notes || 'Aucune note'}
                                </span>
                            </div>
                        </td>`;

                    // Ajouter les colonnes supplémentaires pour la table des livres terminés
                    if (isFinished) {
                        newRow.innerHTML = baseHtml + `
                            <td>${generateRatingStars(bookData.rating)}</td>
                            <td class="text-end">${formatDate(getDate(bookData))}</td>`;
                    } else {
                        newRow.innerHTML = baseHtml + `
                            <td class="text-end">${formatDate(getDate(bookData))}</td>`;
                    }
                    
                    targetTable.appendChild(newRow);
                    console.log('Nouvelle ligne ajoutée à la table:', targetTableId);
                }
                
                form.reset();
                currentBookId = null;
            } else {
                alert(responseData.errors.join('\n'));
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Une erreur est survenue lors de l\'ajout du livre: ' + error.message);
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
            }
            isSubmitting = false;
        }
    });
});

function fillBookForm(bookId) {
    fetch(`/user/book/${bookId}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                currentBookId = bookId;
                console.log('Données reçues dans fillBookForm:', data);
                
                // Remplir le formulaire avec les données du livre
                const bookSelect = form.querySelector('[name="user_book[book]"]');
                const notesInput = form.querySelector('[name="user_book[notes]"]');
                const ratingInput = form.querySelector('[name="user_book[rating]"]');
                const isFinishedInput = form.querySelector('[name="user_book[isFinished]"]');
                
                // Extraire les données correctement
                const bookData = data.book || data;
                
                if (bookSelect) bookSelect.value = bookData.book ? bookData.book.id : bookData.id;
                if (notesInput) notesInput.value = bookData.notes || '';
                if (ratingInput) ratingInput.value = bookData.rating || '';
                if (isFinishedInput) isFinishedInput.checked = bookData.isFinished;
                
                // Ouvrir la modal
                const modal = document.getElementById('book_modal');
                if (modal) {
                    modal.classList.remove('hidden');
                    modal.classList.add('open');
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                    
                    const backdrop = document.createElement('div');
                    backdrop.className = 'modal-backdrop';
                    document.body.appendChild(backdrop);
                }
            } else {
                alert('Erreur lors de la récupération des données du livre');
            }
        })
        .catch(error => {
            console.error('Erreur:', error);
            alert('Une erreur est survenue lors de la récupération des données du livre');
        });
}
