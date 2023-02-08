import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import useHistory, { Link, useNavigate } from "react-router-dom";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";

const Home = () => {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/posts", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        setListOfPosts(res.data.listPosts);
        setLikedPosts(res.data.likedPosts?.map((like) => like.PostId));
      });
  }, []);

  const LikeAPost = (id) => {
    axios
      .post(
        "http://localhost:8080/like",
        { PostId: id },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((res) => {
        setListOfPosts(
          listOfPosts.map((post) => {
            if (post.id === id) {
              if (res.data.Liked) {
                console.log("");
                return { ...post, Likes: [...post.Likes, 0] };
              } else {
                const likesArray = post.Likes;
                likesArray.pop();
                return { ...post, Likes: likesArray };
              }
            } else {
              return post;
            }
          })
        );
        if (likedPosts.includes(id)) {
          setLikedPosts(likedPosts.filter((item) => item !== id));
        } else {
          setLikedPosts([...likedPosts, id]);
        }
      });
  };

  return (
    <div>
      {listOfPosts?.map((value) => {
        return (
          <div className="post" key={value.id}>
            <div
              className="title"
              onClick={() => navigate(`/post/${value.id}`)}
            >
              {value.title}
            </div>
            <div className="body" onClick={() => navigate(`/post/${value.id}`)}>
              {value.postText}
            </div>
            <div className="footer">
              <div className="username">
                <Link to={`/profile/${value.UserId}`}>{value.username}</Link>
              </div>
              <div className="btn_like">
                <ThumbUpOffAltIcon
                  onClick={() => LikeAPost(value.id)}
                  className={
                    likedPosts.includes(value.id) ? "unLikeBtn" : "likeBtn"
                  }
                />
                <span>{value.Likes.length}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
