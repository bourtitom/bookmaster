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
                // Mettre à jour le tableau
                if (responseData.html) {
                    const tableBody = document.querySelector(currentBookId ? '#finished-books-table tbody' : '#current-books-table tbody');
                    if (!currentBookId) {
                        // Pour un nouveau livre, ajouter au début
                        tableBody.insertAdjacentHTML('afterbegin', responseData.html);
                    } else {
                        // Pour une modification, remplacer la ligne existante
                        const existingRow = document.querySelector(`[data-book-id="${currentBookId}"]`).closest('tr');
                        existingRow.outerHTML = responseData.html;
                    }
                }

                // Afficher un message de confirmation
                const message = document.createElement('div');
                message.className = 'alert alert-success alert-dismissible fade show fixed top-4 right-4 z-50';
                message.innerHTML = `
                    <div class="alert-content">
                        <div class="alert-title">Succès!</div>
                        <div class="alert-text">Le livre a été ${currentBookId ? 'modifié' : 'ajouté'} avec succès.</div>
                    </div>
                    <button type="button" class="btn btn-icon btn-sm btn-clear" data-bs-dismiss="alert">
                        <i class="ki-duotone ki-cross fs-2">
                            <span class="path1"></span>
                            <span class="path2"></span>
                        </i>
                    </button>
                `;
                document.body.appendChild(message);
                setTimeout(() => message.remove(), 3000);

                // Fermer la modal
                const modal = document.querySelector('#book_modal');
                if (modal) {
                    const backdrop = document.querySelector('.modal-backdrop');
                    modal.classList.remove('show');
                    if (backdrop) backdrop.remove();
                    modal.style.display = 'none';
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
