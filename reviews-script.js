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

    const displayReviews = () => {
        reviewsGrid.innerHTML = '';

        let reviews = JSON.parse(localStorage.getItem('customerReviews')) || [];

        if (reviews.length === 0) {
            reviewsGrid.innerHTML = '<p style="text-align: center; width: 100%; color: #666;">No reviews yet. Be the first to leave one!</p>';
            return;
        }

        reviews.reverse().forEach(review => {
            const reviewCard = document.createElement('div');
            reviewCard.classList.add('review-card');

            reviewCard.innerHTML = `
                <div class="rating">
                    ${createStarRatingHTML(review.rating)} <span class="score">${review.rating}.0</span>
                </div>
                <p class="review-text">"${review.reviewText}"</p>
                <div class="reviewer-info">
                    <div class="reviewer-initials">${review.initials}</div>
                    <div class="reviewer-details">
                        <div class="reviewer-name">${review.name}</div>
                        <div class="verified-customer">Verified Customer</div>
                    </div>
                </div>
            `;
            reviewsGrid.appendChild(reviewCard);
        });
    };

    displayReviews();
});