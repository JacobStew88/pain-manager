document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bookmarkForm");
  const list = document.getElementById("bookmarkList");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const bookmark = {
      url: formData.get("url"),
      title: formData.get("title")
    };

    try {
      const res = await fetch("/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookmark)
      });
      const newBookmark = await res.json();

      // Append to list
      const li = document.createElement("li");
      li.id = newBookmark.id;
      li.innerHTML = `<a href="${newBookmark.url}" target="_blank">${newBookmark.title}</a>
                      <button class="deleteBtn" data-id="${newBookmark.id}">Delete</button>`;
      list.appendChild(li);
      form.reset();
    } catch (err) {
      console.error(err);
      alert("Failed to add bookmark");
    }
  });

  // Delegate delete buttons
  list.addEventListener("click", async (e) => {
    if (e.target.classList.contains("deleteBtn")) {
      const id = e.target.dataset.id;
      try {
        await fetch(`/bookmarks/${id}`, { method: "DELETE" });
        document.getElementById(id).remove();
      } catch (err) {
        console.error(err);
        alert("Failed to delete bookmark");
      }
    }
  });
});