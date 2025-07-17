<<<<<<< HEAD
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

    const displayAdminReviews = () => {
        reviewsList.innerHTML = '';

        let reviews = JSON.parse(localStorage.getItem('customerReviews')) || [];

        if (reviews.length === 0) {
            reviewsList.innerHTML = '<p style="text-align: center; color: #666;">No reviews to manage.</p>';
            return;
        }

        reviews.forEach(review => {
            const reviewItem = document.createElement('div');
            reviewItem.classList.add('review-item');
            reviewItem.setAttribute('data-review-id', review.id);

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

        attachDeleteListeners();
    };

    const attachDeleteListeners = () => {
        const deleteButtons = reviewsList.querySelectorAll('.delete-button');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const reviewIdToDelete = parseInt(event.target.dataset.reviewId);
                deleteReview(reviewIdToDelete);
            });
        });
    };

    const deleteReview = (id) => {
        let reviews = JSON.parse(localStorage.getItem('customerReviews')) || [];
        reviews = reviews.filter(review => review.id !== id);
        localStorage.setItem('customerReviews', JSON.stringify(reviews));

        displayAdminReviews();

        alert('Review deleted successfully!');
    };

    displayAdminReviews();
=======
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

    const displayAdminReviews = () => {
        reviewsList.innerHTML = '';

        let reviews = JSON.parse(localStorage.getItem('customerReviews')) || [];

        if (reviews.length === 0) {
            reviewsList.innerHTML = '<p style="text-align: center; color: #666;">No reviews to manage.</p>';
            return;
        }

        reviews.forEach(review => {
            const reviewItem = document.createElement('div');
            reviewItem.classList.add('review-item');
            reviewItem.setAttribute('data-review-id', review.id);

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

        attachDeleteListeners();
    };

    const attachDeleteListeners = () => {
        const deleteButtons = reviewsList.querySelectorAll('.delete-button');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const reviewIdToDelete = parseInt(event.target.dataset.reviewId);
                deleteReview(reviewIdToDelete);
            });
        });
    };

    const deleteReview = (id) => {
        let reviews = JSON.parse(localStorage.getItem('customerReviews')) || [];
        reviews = reviews.filter(review => review.id !== id);
        localStorage.setItem('customerReviews', JSON.stringify(reviews));

        displayAdminReviews();

        alert('Review deleted successfully!');
    };

    displayAdminReviews();
>>>>>>> cda613d8054a0bbd5932fc4a8521092c91771b93
});