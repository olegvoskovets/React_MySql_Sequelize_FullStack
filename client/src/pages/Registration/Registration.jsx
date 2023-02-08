import "./registration.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

const Registration = () => {
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    password: Yup.string().min(3).max(20).required(),
    username: Yup.string().min(3).max(15).required("Перевірте ім'я "),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:8080/auth", data);
    navigate("/login");
  };
  return (
    <div className="registration">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer ">
          <label>Ім'я: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            id="inputCreatePost"
            name="username"
            placeholder="Введіть ім'я"
            autocomplete="off"
          />
          <label>Пароль: </label>
          <ErrorMessage name="Password" component="span" />
          <Field
            id="inputCreatePost"
            name="password"
            type="password"
            placeholder="Введіть пароль ..."
            autocomplete="off"
          />

          <button type="submit">Зарееструватись</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Registration;
