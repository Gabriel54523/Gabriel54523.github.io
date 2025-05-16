 document.getElementById("searchBar").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const articles = document.querySelectorAll(".news-card");

  articles.forEach(article => {
    const text = article.innerText.toLowerCase();
    if (text.includes(query)) {
      article.style.display = "block";
    } else {
      article.style.display = "none";
    }
  });
});
