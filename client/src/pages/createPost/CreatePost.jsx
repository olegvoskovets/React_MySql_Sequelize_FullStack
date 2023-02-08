import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

const CreatePost = () => {
  const navigate = useNavigate();
  const initialValues = {
    title: "",
    postText: "",
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a Title!"),
    postText: Yup.string().required(),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:8080/posts", data, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    });
    navigate("/");
  };
  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer ">
          <label>Назва посту: </label>
          <ErrorMessage name="title" component="span" />
          <Field
            id="inputCreatePost"
            name="title"
            placeholder="Введіть назву посту ..."
            // autocomplet="off"
          />
          <label>Текст: </label>
          <ErrorMessage name="postText" component="span" />
          <Field
            id="inputCreatePost"
            name="postText"
            placeholder="Напишить новий пост ..."
            // autocomplete="off"
          />
          {/* <label>Ім'я: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            id="inputCreatePost"
            name="username"
            placeholder="Введіть ім'я"
            autocomplete="off"
          /> */}
          <button type="submit">Створити пост</button>
        </Form>
      </Formik>
    </div>
  );
};

export default CreatePost;
