document.addEventListener('DOMContentLoaded', () => {
    const reviewForm = document.getElementById('reviewForm');
    const starRating = document.getElementById('starRating');
    const stars = starRating.querySelectorAll('.star');
    const selectedRatingInput = document.getElementById('selectedRating');
    let currentRating = 0;

    const updateStarRating = (rating) => {
        stars.forEach((star) => {
            const starValue = parseInt(star.dataset.value);
            if (starValue <= rating) {
                star.classList.add('selected');
            } else {
                star.classList.remove('selected');
            }
        });
    };

    starRating.addEventListener('click', (event) => {
        const clickedStar = event.target.closest('.star');
        if (clickedStar) {
            currentRating = parseInt(clickedStar.dataset.value);
            selectedRatingInput.value = currentRating;
            updateStarRating(currentRating);
        }
    });

    starRating.addEventListener('mouseover', (event) => {
        const hoveredStar = event.target.closest('.star');
        if (hoveredStar) {
            const hoverRating = parseInt(hoveredStar.dataset.value);
            updateStarRating(hoverRating);
        }
    });

    starRating.addEventListener('mouseout', () => {
        updateStarRating(currentRating);
    });

    reviewForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const reviewText = document.getElementById('reviewText').value;
        const rating = parseInt(selectedRatingInput.value);

        if (rating === 0) {
            alert('Please select a star rating.');
            return;
        }

        const review = {
            id: Date.now(),
            name: name,
            email: email,
            rating: rating,
            reviewText: reviewText,
            initials: name.charAt(0).toUpperCase()
        };

        let reviews = JSON.parse(localStorage.getItem('customerReviews')) || [];

        reviews.push(review);

        localStorage.setItem('customerReviews', JSON.stringify(reviews));

        alert('Thank you for your review! Redirecting to customer reviews page.');

        window.location.href = 'reviews.html';
    });
});