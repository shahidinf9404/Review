document.addEventListener('DOMContentLoaded', () => {
    const reviewsList = document.getElementById('reviewsList');

    const createStarRatingHTML = (rating) => {
        let starsHTML = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                starsHTML += '&#9733;';
            } else {
                starsHTML += '&#9734;';
            }
        }
        return starsHTML;
    };

    const displayAdminReviews = async () => {
        reviewsList.innerHTML = '';

        try {
            // Mengambil dokumen dari koleksi 'reviews', diurutkan berdasarkan timestamp terbaru
            // Menggunakan fungsi Firebase modular yang diekspor ke window
            const snapshot = await window.getDocs(window.query(window.collection(window.db, 'reviews'), window.orderBy('timestamp', 'desc')));
            const reviews = [];
            snapshot.forEach(doc => {
                // Memasukkan ID dokumen ke dalam objek review untuk memudahkan penghapusan
                reviews.push({ id: doc.id, ...doc.data() });
            });

            if (reviews.length === 0) {
                reviewsList.innerHTML = '<p style="text-align: center; color: #666;">No reviews to manage.</p>';
                return;
            }

            reviews.forEach(review => {
                const reviewItem = document.createElement('div');
                reviewItem.classList.add('review-item');

                const initials = review.name ? review.name.charAt(0).toUpperCase() : '?';

                reviewItem.innerHTML = `
                    <div class="review-content">
                        <strong>${review.name} (${review.email})</strong>
                        <span class="rating-display">${createStarRatingHTML(review.rating)}</span>
                        <span class="comment-text">"${review.reviewText}"</span>
                    </div>
                    <button class="delete-button" data-review-id="${review.id}">Delete</button>
                `;
                reviewsList.appendChild(reviewItem);
            });

            // Melampirkan event listener setelah semua tombol dibuat
            attachDeleteListeners();
        } catch (error) {
            // Menampilkan pesan error di halaman dan di konsol browser
            reviewsList.innerHTML = '<p style="text-align: center; color: #e74c3c;">Failed to load reviews for admin. Please check your Firebase setup.</p>';
            console.error('Error fetching admin reviews from Firebase:', error);
        }
    };

    const attachDeleteListeners = () => {
        const deleteButtons = reviewsList.querySelectorAll('.delete-button');
        deleteButtons.forEach(button => {
            button.addEventListener('click', async (event) => {
                const reviewIdToDelete = event.target.dataset.reviewId;
                if (confirm('Are you sure you want to delete this review?')) {
                    try {
                        // Menghapus dokumen dari Firestore berdasarkan ID
                        // Menggunakan fungsi Firebase modular yang diekspor ke window
                        await window.deleteDoc(window.doc(window.db, 'reviews', reviewIdToDelete));
                        alert('Review deleted successfully!');
                        displayAdminReviews(); // Muat ulang daftar ulasan setelah penghapusan
                    } catch (error) {
                        alert('Failed to delete review: ' + error.message);
                        console.error('Error deleting review from Firebase:', error);
                    }
                }
            });
        });
    };

    displayAdminReviews();
});