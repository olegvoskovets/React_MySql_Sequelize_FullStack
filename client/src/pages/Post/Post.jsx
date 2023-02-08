import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextArea } from "@adobe/react-spectrum";
import { AuthContext } from "../../helpers/AuthContext";

import "./post.css";

const Post = () => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [valueComment, setvalueComment] = useState("");
  const { authState } = useContext(AuthContext);
  let { id } = useParams();
  const navigate = useNavigate();

  const AddComment = () => {
    axios
      .post(
        "http://localhost:8080/comments/",
        {
          commentBody: valueComment,
          PostId: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((res) => {
        if (res.data.error) {
          console.log(res.data.error);
        } else {
          const newComment = {
            commentBody: valueComment,
            username: res.data.username,
          };
          setComments([...comments, newComment]);
        }
      });
    setvalueComment("");
  };
  const deleteComment = (id) => {
    axios
      .delete(`http://localhost:8080/comments/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        setComments(comments.filter((item) => item.id !== id));
      });
  };

  useEffect(() => {
    axios.get("http://localhost:8080/posts/byId/" + id).then((res) => {
      setPost(res.data);
    });

    axios.get("http://localhost:8080/comments/" + id).then((res) => {
      setComments(res.data);
    });
  }, []);
  const deletePost = (id) => {
    axios
      .delete("http://localhost:8080/posts/" + id, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        navigate("/");
      });
  };

  const editPost = (option) => {
    if (option === "title") {
      let newTitle = prompt("введіть новий title");
      axios.put(
        `http://localhost:8080/posts/title`,
        { newTitle: newTitle, id: id },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      );
      setPost({ ...post, title: newTitle });
    } else {
      let newPostText = prompt("введіть новий текст");
      axios.put(
        `http://localhost:8080/posts/postText`,
        { newText: newPostText, id: id },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      );
      setPost({ ...post, postText: newPostText });
    }
  };
  return (
    <div className="postPage">
      <div className="left">
        <div className="post">
          <div
            className="title"
            onClick={() => {
              if (authState.username === post.username) {
                editPost("title");
              }
            }}
          >
            {post.title}
            {authState.username === post.username && (
              <div className="delete_post" onClick={() => deletePost(post.id)}>
                X
              </div>
            )}
          </div>
          <div
            className="postText"
            onClick={() => {
              if (authState.username === post.username) {
                editPost("postText");
              }
            }}
          >
            {post.postText}
          </div>
          <div className="footer">{post.username}</div>
        </div>
      </div>
      <div className="right">
        <div className="addCommentContainer">
          <TextArea
            label="Створіть коментарій  до посту"
            value={valueComment}
            onChange={setvalueComment}
          />
          <button onClick={AddComment}>Добавити kоментарій</button>
        </div>
        <div className="listOfComments">
          {comments.map((comment) => {
            return (
              <div className="comment" key={comment?.id}>
                {comment.commentBody}
                <div>User: {comment.username}</div>

                {authState.username === comment.username && (
                  <button onClick={() => deleteComment(comment.id)}>X</button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Post;
