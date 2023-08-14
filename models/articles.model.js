function retrieveArticleById(id) {
  console.log("in the model");
  return db
    .query("SELECT * FROM articles WHERE article_id 1")
    .then((article) => console.log(article, "article"));
}

module.exports = retrieveArticleById;
