import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function OneArticle() {
  const [singleArticle, setSingleArticle] = useState([]);
  const [articleComments, setArticleComments] = useState([]);

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

  useEffect(() => {
    axios
      .get(
        `https://backend-service-project-2.onrender.com/api/articles/${article_id}/comments`
      )
      .then((response) => {
        setArticleComments(response.data.comments);
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
      <br />
      <h2>Comments</h2>
      {articleComments
        .sort((a, b) => b.votes - a.votes)
        .map((comment) => {
          return (
            <div className="comment" key={comment.comment_id}>
              <p className="commentAuthor">{comment.author}</p>
              <p>{comment.body}</p>
              <p>{comment.created_at}</p>
              <p>votes: {comment.votes}</p>
            </div>
          );
        })}
    </div>
  );
}

export default OneArticle;
