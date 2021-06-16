import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import validator from "validator";
import { Link } from "react-router-dom";
import { Alerta } from "../../helpers/Alerta";
import { useForm } from "../../hooks/useForm";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
// import { useDispatch } from "react-redux";
// import { login } from "../../../actions/auth";
import "./index.scss";
import { useHistory } from "react-router-dom";

export const LoginScreen = () => {
  // const dispatch = useDispatch();
  const [user, setUser] = useState({
    id: "",
  });
  const history = useHistory();

  const [{ open, message, emoji, success }, setOpen] = useState({
    open: false,
    message: "",
    emoji: "",
    success: false,
  });
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [errors, setErrors] = useState({});
  const [{ email, password, closeSesion }, handleChange] = useForm({
    email: "",
    password: "",
    closeSesion: false,
  });

  const handleClose = () => {
    setOpen({
      open: false,
      message: "",
      emoji: "",
      success: false,
    });
    if (success) history.push(`/${user}`);

    // dispatch(login(user));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validForm();
    if (Object.keys(errors).length === 0) {
      setDisabledBtn(true);
      try {
        const { data } = await axios.post(
          "http://localhost:3001/api/v1/afiliados/login",
          {
            email: email,
            password: password,
          }
        );
        console.log(data);

        setUser(data["usuario validado"].id);

        console.log(data["usuario validado"].id);

        updAlerta("Tu sesión se inicio correctamente.", "👍", true);

        // if (data.user_type.id === 1) {
        //   const tokenData = await getToken(data.api_key);
        //   setUser({
        //     api_key: data.api_key,
        //     userName: tokenData.user.username,
        //     email: tokenData.user.email,
        //     tokenAccess: tokenData.access,
        //     tokenRefresh: tokenData.refresh,
        //     name: tokenData.user.name,
        //     userType: tokenData.user.user_type.id,
        //     closeSesion: closeSesion,
        //   });
        // } else {
        //   updAlerta(
        //     "No cuentas con los permisos necesarios para ingresar al portal de Administración.",
        //     ""
        //   );
        // }
      } catch (error) {
        console.log(error);
        updAlerta("Correo o contraseña Inválidos", "⚠️", false);
      }
    }
  };

  const getToken = async (api_key) => {
    try {
      const { data } = await axios.post(
        "https://kikoya-portal.herokuapp.com/api/v1/login/token",
        {
          api_key,
          host: "sandbox001369cd406f49aa875bd8f230a0de80.mailgun.org",
        }
      );
      return data;
    } catch (error) {
      const { data } = error.response;
      if (data.detail === "This user has expired") {
        updAlerta("El usuario ha expirado.", "⚠️", false);
      }
    }
  };

  const updAlerta = (message, emoji, success) => {
    setOpen({
      open: true,
      message,
      emoji,
      success,
    });
    setDisabledBtn(false);
  };

  const validForm = () => {
    setErrors({});
    let errors = {};
    if (!validator.isEmail(email)) {
      errors.email = "ingrese un email valido";
    }

    if (validator.isEmpty(email)) {
      errors.email = "Campo obligatorio";
    }

    if (validator.isEmpty(password)) {
      errors.password = "Campo obligatorio";
    }

    setErrors(errors);

    return errors;
  };

  const handleInputPress = (e) => {
    let error = "";
    switch (e.target.name) {
      case "email":
        if (!validator.isEmail(e.target.value)) {
          error = "Ingrese un email valido";
        }
        break;

      default:
        break;
    }

    if (validator.isEmpty(e.target.value)) {
      error = "Campo obligatorio";
    }

    setErrors({ ...errors, [e.target.name]: error });
  };

  return (
    <div className="loginAdmin__container">
      <form className="loginAdmin_form" onSubmit={handleSubmit}>
        <h1 className="login__titulo">Inicia Sesión</h1>
        <div className="loginAdmin__containerInput">
          <TextField
            className="loginAdmin__input"
            label="Correo"
            name="email"
            value={email}
            onChange={handleChange}
            onKeyUp={handleInputPress}
            error={errors.email ? true : false}
            helperText={errors.email && errors.email}
          />
        </div>
        <div className="loginAdmin__containerInput">
          <TextField
            className="loginAdmin__input"
            label="Contraseña"
            name="password"
            size="small"
            type="password"
            value={password}
            onChange={handleChange}
            onKeyUp={handleInputPress}
            error={errors.password ? true : false}
            helperText={errors.password && errors.password}
          />
        </div>
        <div className="loginAdmin__container_ingresar">
          {disabledBtn ? (
            <CircularProgress style={{ alignSelf: "center" }} />
          ) : (
            <Button
              variant="contained"
              style={{
                width: "100%",
                display: "block",
                padding: "15px 0",
                margin: "15px 0",
                maxWidth: "400px",
                background: "#fc7702",
                fontWeight: "bold",
                color: "#ffffff",
              }}
              type="submit"
            >
              INICIAR SESIÓN
            </Button>
          )}
        </div>
        <Link
          style={{ display: "block", margin: "8px 0" }}
          to="/auth/registro"
          className="forgotPass"
        >
          ¿No tienes cuenta? <b>Registrate</b>
        </Link>
      </form>
      <div className="capaLogo"></div>
      <Alerta
        open={open}
        message={message}
        emoji={emoji}
        handleClose={handleClose}
      />
    </div>
  );
};
