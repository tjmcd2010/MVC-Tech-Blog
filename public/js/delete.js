// Delete request function
function deleteBlog(blogId) {
  const confirmDelete = confirm("Are you sure you want to delete this blog?");
  if (!confirmDelete) {
    return;
  }
  fetch(`/api/blogs/${blogId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        window.location.href = "/blog"
      } else {
        alert("You must be logged in to delete a blog.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Add event listener to delete button
document.querySelectorAll(".delete-btn").forEach((button) => {
  button.addEventListener("click", (event) => {
    const bloggedId = button.getAttribute("data-blog-id");
    deleteBlog(bloggedId);
  });
});
