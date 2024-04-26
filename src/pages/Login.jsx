import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Login.module.css";

const initialFormValues = {
  email: "",
  password: "",
};

export const Login = ({ login }) => {
  const [currentError, setCurrentError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (values, actions) => {
    try {
      await login(values.email, values.password);
      navigate("/");
    } catch (error) {
      setCurrentError("Error al iniciar sesión. Por favor, intenta de nuevo.");
    }
    actions.resetForm(initialFormValues);
  };

  return (
    <section className={styles.sectionLogin}>
      <Formik initialValues={initialFormValues} onSubmit={handleSubmit}>
        <Form>
          <h1 className={styles.title}>
            Quantum Tickets
            <span>🎫🎫🎫</span>
          </h1>
          <div className={styles.formField}>
            <label htmlFor="email">Correo electrónico</label>
            <Field
              type="email"
              id="email"
              name="email"
              placeholder="Ingresa tu correo electrónico"
            />
          </div>
          <div className={styles.formField}>
            <label htmlFor="password">Password</label>
            <Field
              type="password"
              id="password"
              name="password"
              placeholder="Ingresa tu contraseña"
            />
          </div>
          <button type="submit">Iniciar sesión</button>
          {currentError && <p className={styles.error}>{currentError}</p>}
        </Form>
      </Formik>
    </section>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
};
