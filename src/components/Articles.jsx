import { useState, useEffect } from "react";
import axios from "axios";

function Articles({ article, setArticle }) {
  useEffect(() => {
    axios
      .get("https://backend-service-project-2.onrender.com/api/articles")
      .then((response) => {
        let filteredArticles = response.data.articles;
        setArticle(filteredArticles);
      });
  }, []);

  return (
    <div>
      {article.map((article) => {
        return (
          <div
            key={article.article_id}
            style={{
              border: "1px solid #ccc",
              padding: "12px",
              marginBottom: "12px",
              backgroundColor: "white",
              color: "black",
            }}
            className="article"
          >
            <h4>{article.title}</h4>
            <img src={article.article_img_url} width="200" />
            <p>written by: {article.author}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Articles;
