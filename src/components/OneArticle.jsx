import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function OneArticle() {
  const [singleArticle, setSingleArticle] = useState([]);
  const [articleComments, setArticleComments] = useState([]);
  const [upvoteClick, setUpvoteClick] = useState(false);
  const [downvoteClick, setDownvoteClick] = useState(false);
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");
  const [commentPosted, setCommentPosted] = useState(false);

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

  function handleClick(vote, article_id) {
    const updateVote = { ...singleArticle };

    if (!downvoteClick && !upvoteClick) {
      updateVote.votes += vote;
      setSingleArticle(updateVote);

      axios
        .patch(
          `https://backend-service-project-2.onrender.com/api/articles/${article_id}`,
          { inc_votes: vote }
        )
        .catch((err) => {
          updateVote.votes -= vote;
          setSingleArticle(updateVote);
        });
    } else if (!downvoteClick && upvoteClick) {
      updateVote.votes -= 2;
      setSingleArticle(updateVote);

      axios
        .patch(
          `https://backend-service-project-2.onrender.com/api/articles/${article_id}`,
          { inc_votes: -2 }
        )
        .catch((err) => {
          updateVote.votes += 2;
          setSingleArticle(updateVote);
        });
    } else if (downvoteClick && !upvoteClick) {
      updateVote.votes += 2;
      setSingleArticle(updateVote);

      axios
        .patch(
          `https://backend-service-project-2.onrender.com/api/articles/${article_id}`,
          { inc_votes: 2 }
        )
        .catch((err) => {
          updateVote.votes -= 2;
          setSingleArticle(updateVote);
        });
    }

    if (vote === 1) {
      setUpvoteClick(true);
      setDownvoteClick(false);
    } else if (vote === -1) {
      setUpvoteClick(false);
      setDownvoteClick(true);
    }
  }

  function postComment() {
    axios
      .post(
        `https://backend-service-project-2.onrender.com/api/articles/${article_id}/comments`,
        { username: username, body: comment }
      )
      .then((response) => {
        setCommentPosted(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
      <h3>Votes: {singleArticle.votes}</h3>
      <button
        className="upvoteButton"
        onClick={() => handleClick(1, article_id)}
        disabled={upvoteClick}
      >
        Upvote
      </button>
      <button
        className="downvoteButton"
        onClick={() => handleClick(-1, article_id)}
        disabled={downvoteClick}
      >
        Downvote
      </button>
      <br />
      <h2>Comments</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          postComment(username, comment);
        }}
      >
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <br />
        <label htmlFor="comment">Comment: </label>
        <textarea
          id="comment"
          name="comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          style={{
            height: "120px",
            resize: "both",
            verticalAlign: "top",
            paddingTop: "8px",
            marginTop: "8px",
          }}
        />
        <br />
        <button type="submit" disabled={commentPosted}>
          Post comment
        </button>
        {commentPosted && (
          <p style={{ color: "green" }}>Comment posted successfully!</p>
        )}
      </form>
      {articleComments
        .sort((a, b) => b.votes - a.votes)
        .map((comment) => {
          return (
            <div className="comment" key={comment.comment_id}>
              <p className="commentAuthor">{comment.author}</p>
              <p>{comment.body}</p>
              <p>Posted at: {comment.created_at}</p>
              <p>votes: {comment.votes}</p>
            </div>
          );
        })}
    </div>
  );
}

export default OneArticle;
