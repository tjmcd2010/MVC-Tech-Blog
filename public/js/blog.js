
  const blogForm = document.querySelector('#new-request-form');

blogForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const blogTitle = document.querySelector('#blog-title').value.trim();
  const blogContent = document.querySelector('#blog-content').value.trim();

  if (!blogTitle || !blogContent) {
    alert('Please fill in both the title and content fields.');
    return;
  }

  const blogBody = { title: blogTitle, content: blogContent };

  try {
    const response = await fetch('/api/blogs/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blogBody),
    });

    if (response.ok) {
      alert('Blog post created successfully!');
      window.location.href = '/blog';
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.error}`);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while creating the blog post.');
  }
});