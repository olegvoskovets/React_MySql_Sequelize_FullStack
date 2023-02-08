import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./profile.css";

const Profile = () => {
  let { id } = useParams();
  const [profile, setProfile] = useState({});
  const [listOfPosts, setlistOfPosts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`http://localhost:8080/auth/profile/${id}`).then((res) => {
      setProfile(res.data);
    });
    axios.get(`http://localhost:8080/posts/byuserId/${id}`).then((res) => {
      setlistOfPosts(res.data);
    });
  }, []);

  return (
    <div className="profilePageContainer">
      <div className="user_info">Користувач:{profile.username}</div>
      <div className="listOfPosts">
        {listOfPosts?.map((value) => {
          return (
            <div className="post" key={value.id}>
              <div className="title">{value.title}</div>
              <div className="body">{value.postText}</div>
              <div className="footer">
                <div className="username">{value.username}</div>
                <div className="btn_like">
                  <span>{value.Likes.length}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
