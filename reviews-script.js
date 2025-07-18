document.addEventListener('DOMContentLoaded', () => {
    const reviewsGrid = document.getElementById('reviewsGrid');

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

    const displayReviews = async () => {
        reviewsGrid.innerHTML = '';

        try {
            const snapshot = await window.getDocs(window.query(window.collection(window.db, 'reviews'), window.orderBy('timestamp', 'desc')));
            const reviews = [];
            snapshot.forEach(doc => {
                const data = doc.data();
                reviews.push({ id: doc.id, ...data });
            });

            if (reviews.length === 0) {
                reviewsGrid.innerHTML = '<p style="text-align: center; width: 100%; color: #666;">No reviews yet. Be the first to leave one!</p>';
                return;
            }

            reviews.forEach(review => {
                const reviewCard = document.createElement('div');
                reviewCard.classList.add('review-card');

                const initials = review.name ? review.name.charAt(0).toUpperCase() : '?';

                reviewCard.innerHTML = `
                    <div class="rating">
                        ${createStarRatingHTML(review.rating)} <span class="score">${review.rating}.0</span>
                    </div>
                    <p class="review-text">"${review.reviewText}"</p>
                    <div class="reviewer-info">
                        <div class="reviewer-initials">${initials}</div>
                        <div class="reviewer-details">
                            <div class="reviewer-name">${review.name}</div>
                            <div class="verified-customer">Verified Customer</div>
                        </div>
                    </div>
                `;
                reviewsGrid.appendChild(reviewCard);
            });
        } catch (error) {
            reviewsGrid.innerHTML = '<p style="text-align: center; width: 100%; color: #e74c3c;">Failed to load reviews. Please check your Firebase setup.</p>';
            console.error('Error fetching reviews from Firebase:', error);
        }
    };

    displayReviews();
});