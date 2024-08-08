document.querySelector("#new-request-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const blogTitle = document.querySelector("#blog-title").value.trim();
  const blogContent = document.querySelector("#blog-content").value.trim();
  const blogBody = JSON.stringify({ blogTitle, blogContent });


  fetch("/api/blog", {
    method: "POST",
    body: blogBody,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(() => {
      alert("Submitted!");
      console.log(blogBody);
      window.location.href = "/blog";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

