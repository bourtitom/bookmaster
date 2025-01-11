document.addEventListener('DOMContentLoaded', function() {
    console.log('Script chargé');
    const form = document.getElementById('user-book-form');
    if (!form) {
        console.error('Formulaire non trouvé');
        return;
    }
    
    let isSubmitting = false; // Flag pour éviter la double soumission
    let currentBookId = null; // ID du livre en cours d'édition
    
    // Gérer le changement de livre pour mettre à jour la catégorie
    const bookSelect = form.querySelector('[name="user_book[book]"]');
    const categorySelect = form.querySelector('[name="user_book[category]"]');
    
    if (bookSelect && categorySelect) {
        bookSelect.addEventListener('change', async function() {
            const selectedBookId = this.value;
            if (!selectedBookId) {
                categorySelect.value = '';
                return;
            }

            try {
                const response = await fetch(`/api/book/${selectedBookId}/category`);
                const data = await response.json();
                
                if (response.ok && data.category) {
                    // Trouver l'option avec le bon texte
                    const options = Array.from(categorySelect.options);
                    const option = options.find(opt => opt.textContent === data.category);
                    if (option) {
                        categorySelect.value = option.value;
                    }
                }
            } catch (error) {
                console.error('Erreur lors de la récupération de la catégorie:', error);
            }
        });
    }
    
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
                const categorySelect = form.querySelector('[name="user_book[category]"]');
                
                console.log('Éléments du formulaire:', {
                    bookSelect: bookSelect ? 'trouvé' : 'non trouvé',
                    ratingInput: ratingInput ? 'trouvé' : 'non trouvé',
                    isFinishedInput: isFinishedInput ? 'trouvé' : 'non trouvé',
                    notesInput: notesInput ? 'trouvé' : 'non trouvé',
                    categorySelect: categorySelect ? 'trouvé' : 'non trouvé'
                });
                
                if (bookSelect) {
                    bookSelect.value = data.book.bookId;
                    // Déclencher l'événement change pour mettre à jour la catégorie
                    bookSelect.dispatchEvent(new Event('change'));
                }
                if (ratingInput) ratingInput.value = data.book.rating || '';
                if (isFinishedInput) isFinishedInput.checked = data.book.isFinished;
                if (notesInput) notesInput.value = data.book.notes || '';
                if (categorySelect && data.book.categoryId) {
                    categorySelect.value = data.book.categoryId;
                }
                
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
                
                // Rafraîchir la page pour mettre à jour les tables
                window.location.reload();
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
                const categorySelect = form.querySelector('[name="user_book[category]"]');
                
                // Extraire les données correctement
                const bookData = data.book || data;
                
                if (bookSelect) bookSelect.value = bookData.book ? bookData.book.id : bookData.id;
                if (notesInput) notesInput.value = bookData.notes || '';
                if (ratingInput) ratingInput.value = bookData.rating || '';
                if (isFinishedInput) isFinishedInput.checked = bookData.isFinished;
                if (categorySelect && bookData.categoryId) {
                    categorySelect.value = bookData.categoryId;
                }
                
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