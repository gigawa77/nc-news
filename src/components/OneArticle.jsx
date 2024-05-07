import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function OneArticle() {
  const [singleArticle, setSingleArticle] = useState([]);

  const { article_id } = useParams();

  useEffect(() => {
    axios
      .get(
        `https://backend-service-project-2.onrender.com/api/articles/${article_id}`
      )
      .then((response) => {
        setSingleArticle(response.data.article[0]);
      });
  }, [article_id]);

  return (
    <div className="article">
      <h4>{singleArticle.title}</h4>
      <br />
      <img src={singleArticle.article_img_url} />
      <br />
      <p>Written by: {singleArticle.author}</p>
      <p>{singleArticle.created_at}</p>
      <br />
      <p>{singleArticle.body}</p>
    </div>
  );
}

export default OneArticle;
