document.getElementById('reviewForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  fetch('/reviews', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content })
  }).then(() => {
    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
    fetchReviews();
  }).catch(err => console.error('Error posting review:', err));
});

function fetchReviews() {
  fetch('/reviews')
  .then(response => response.json())
  .then(reviews => {
      const reviewsContainer = document.getElementById('reviewsContainer');
      reviewsContainer.innerHTML = '';  // Clear previous entries
      reviews.forEach(review => {
          const reviewElement = document.createElement('div');
          reviewElement.innerHTML = `
              <h3>${review.title}</h3>
              <p>${review.content}</p>
              <small>Posted on ${new Date(review.createdAt).toLocaleString()}</small>
          `;
          reviewsContainer.appendChild(reviewElement);
      });
  }).catch(err => {
      console.error('Error fetching reviews:', err);
      alert('Failed to fetch reviews.');
  });
}

// Initial fetch of reviews
fetchReviews();
