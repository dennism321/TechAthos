// Retrieve existing comments from localStorage
function getComments() {
  const stored = localStorage.getItem('post1Comments');
  return stored ? JSON.parse(stored) : [];
}

// Save comments back to localStorage
function saveComments(comments) {
  localStorage.setItem('post1Comments', JSON.stringify(comments));
}

// Render comments to the page
function renderComments() {
  const commentsList = document.getElementById('comments-list');
  const comments = getComments();
  // Clear existing content
  commentsList.innerHTML = '';
  if (comments.length === 0) {
    const empty = document.createElement('p');
    empty.textContent = 'No comments yet. Be the first to comment!';
    commentsList.appendChild(empty);
    return;
  }
  comments.forEach((comment) => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('comment');
    const nameEl = document.createElement('div');
    nameEl.classList.add('comment-name');
    nameEl.textContent = comment.name;
    const dateEl = document.createElement('div');
    dateEl.classList.add('comment-date');
    const date = new Date(comment.date);
    dateEl.textContent = date.toLocaleString();
    const textEl = document.createElement('div');
    textEl.classList.add('comment-text');
    textEl.textContent = comment.text;
    wrapper.appendChild(nameEl);
    wrapper.appendChild(dateEl);
    wrapper.appendChild(textEl);
    commentsList.appendChild(wrapper);
  });
}

// Initialization function to set up event listeners
function initComments() {
  const form = document.getElementById('comment-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('comment-name');
    const textInput = document.getElementById('comment-text');
    const name = nameInput.value.trim();
    const text = textInput.value.trim();
    if (!name || !text) {
      return;
    }
    const newComment = {
      name,
      text,
      date: new Date().toISOString(),
    };
    const comments = getComments();
    comments.push(newComment);
    saveComments(comments);
    // Clear inputs
    nameInput.value = '';
    textInput.value = '';
    renderComments();
  });
  // Render any stored comments on initial load
  renderComments();
}

// Run the initialization once the script is parsed
initComments();