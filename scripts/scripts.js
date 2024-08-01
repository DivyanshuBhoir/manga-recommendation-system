function showRecommendationForm() {
    const form = document.getElementById('recommendationForm');
    form.style.display = form.style.display === 'block' ? 'none' : 'block';
}

function submitRecommendation() {
    const title = document.getElementById('bookTitle').value;
    const author = document.getElementById('bookAuthor').value;
    const summary = document.getElementById('bookSummary').value;

    if (title && author && summary) {
        const postsContainer = document.getElementById('postsContainer');
        const newPost = document.createElement('div');
        newPost.classList.add('post');
        newPost.innerHTML = `
            <h2 class="post-title">${title}</h2>
            <p class="post-author">by ${author}</p>
            <p class="post-content">${summary}</p>
            <div class="comment">Thank you for your recommendation!</div>
        `;
        postsContainer.prepend(newPost); // Add new recommendation at the top
        document.getElementById('recommendationForm').style.display = 'none';
        document.getElementById('bookTitle').value = '';
        document.getElementById('bookAuthor').value = '';
        document.getElementById('bookSummary').value = '';
    } else {
        alert('Please fill in all fields before submitting.');
    }
}
