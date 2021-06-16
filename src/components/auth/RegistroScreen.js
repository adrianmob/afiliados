import React, { useState, useRef } from "react";
import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import validator from "validator";
import { useForm } from "../../hooks/useForm";
import { Alerta } from "../../helpers/Alerta";
import { useHistory } from "react-router-dom";
import axios from "axios";
// import { useDispatch } from "react-redux";
// import { registrar } from "../../../actions/registro";
import "./index.scss";

export const RegistroScreen = () => {
  // const dispatch = useDispatch();
  const history = useHistory();
  const [imgPaquete, setimgPaquete] = useState(null);
  const refImage = useRef(null);

  const [{ open, message, emoji, success }, setOpen] = useState({
    open: false,
    message: "",
    emoji: "",
    success: false,
  });
  const [response, setResponse] = useState({
    name: "",
    apellidoPat: "",
    apellidoMat: "",
    password: "",
    telefono: "",
    correo: "",
  });
  const [errors, setErrors] = useState({});
  const [date, setDate] = useState(Date.now());

  const handleDateChange = (date) => {
    setDate(date);
  };
  const [
    { name, apellidoPat, apellidoMat, password, telefono, correo },
    handleChange,
  ] = useForm({
    name: "",
    apellidoPat: "",
    apellidoMat: "",
    password: "",
    telefono: "",
    correo: "",
  });

  const handleClose = () => {
    setOpen({
      open: false,
      message: "",
      emoji: "",
    });
    if (success) {
      console.log(response);

      // dispatch(registrar(response));
      history.push("/auth/user/validacion");
    }
  };

  const handleChangeInputImg = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onload = (event) => {
      setimgPaquete(file);
      refImage.current.src = event.target.result;
    };

    reader.onerror = (event) => {
      console.log("File could not be read: " + event.target.error.code);
    };

    reader.readAsDataURL(file);
  };

  const saveImageCloudinary = async () => {
    let formData = new FormData();
    formData.append("file", imgPaquete);
    formData.append("upload_preset", `plantilla-afiliado`);

    const { data } = await axios.post(
      "https://api.cloudinary.com/v1_1/rocafunnels-test/image/upload",
      formData
    );

    return data.secure_url;
  };

  const handleSubmit = async (e) => {
    // console.log(date.format("YYYY-MM-DD"));
    e.preventDefault();
    const errors = validForm();
    if (Object.keys(errors).length === 0) {
      try {
        const url = await saveImageCloudinary();
        console.log(url);
        const { data } = await axios.post(
          "http://localhost:3001/api/v1/afiliados",
          {
            nombre: name,
            apellidoPaterno: apellidoPat,
            apellidoMaterno: apellidoMat,
            telefono: telefono,
            email: correo,
            password: password,
            enlace: `/${telefono}`,
            urlImagen: url,
          }
        );

        console.log(data);

        // const { user } = data;

        // setResponse({
        //   host: user.host,
        //   email: user.email,
        //   phone: user.phone,
        //   birthday: date.format("YYYY-MM-DD"),
        //   numeroCliente,
        // });

        updAlerta("Usuario registrado con exito.", "👍", true);
      } catch (error) {
        console.log(error.response);
        updAlerta("Algo salio mal en el servidor", "⚠️");
      }
    }
  };

  const updAlerta = (message, emoji, success = false) => {
    setOpen({
      open: true,
      message,
      emoji,
      success,
    });
  };

  const validForm = () => {
    setErrors({});
    let errors = {};

    if (!validator.isEmail(correo)) {
      errors.correo = "Ingrese un email valido";
    }

    if (validator.isEmpty(name)) {
      errors.name = "Campo obligatorio";
    }
    if (validator.isEmpty(apellidoMat)) {
      errors.apellidoMat = "Campo obligatorio";
    }
    if (validator.isEmpty(apellidoPat)) {
      errors.apellidoPat = "Campo obligatorio";
    }
    if (validator.isEmpty(password)) {
      errors.password = "Campo obligatorio";
    }
    if (validator.isEmpty(name)) {
      errors.name = "Campo obligatorio";
    }
    if (!validator.isNumeric(telefono)) {
      errors.telefono = "Debe ser un numero";
    }
    if (validator.isEmpty(telefono)) {
      errors.telefono = "Campo obligatorio";
    }
    if (validator.isEmpty(correo)) {
      errors.correo = "Campo obligatorio";
    }

    setErrors(errors);

    return errors;
  };

  const handleInputPress = (e) => {
    let error = "";
    switch (e.target.name) {
      case "correo":
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
    <div className="registro__container">
      <div className="registro__form">
        <form onSubmit={handleSubmit}>
          <h1 className="titulo">
            Se parte del grupo de afiliados de RocaFunnels
          </h1>
          <div className="registro__containerInput">
            <TextField
              className="registro__input"
              label="Nombre Completo"
              name="name"
              value={name}
              onChange={handleChange}
              onKeyUp={handleInputPress}
              type="text"
              error={errors.name ? true : false}
              helperText={errors.name && errors.name}
            />
          </div>
          <div className="registro__containerInput">
            <TextField
              className="registro__input"
              label="Apellido Paterno"
              type="text"
              name="apellidoPat"
              value={apellidoPat}
              onChange={handleChange}
              error={errors.apellidoPat ? true : false}
              helperText={errors.apellidoPat && errors.apellidoPat}
              onKeyUp={handleInputPress}
            />
          </div>
          <div className="registro__containerInput">
            <TextField
              className="registro__input"
              label="Apellido Materno"
              name="apellidoMat"
              type="text"
              value={apellidoMat}
              error={errors.apellidoMat ? true : false}
              helperText={errors.apellidoMat && errors.apellidoMat}
              onChange={handleChange}
              onKeyUp={handleInputPress}
            />
          </div>
          <div className="registro__containerInput">
            <TextField
              className="registro__input"
              label="Contraseña"
              name="password"
              type="password"
              value={password}
              error={errors.password ? true : false}
              helperText={errors.password && errors.password}
              onChange={handleChange}
              onKeyUp={handleInputPress}
            />
          </div>
          <div className="registro__containerInput">
            <TextField
              inputProps={{ maxLength: 10 }}
              className="registro__input"
              label="Telefono"
              name="telefono"
              type="number"
              value={telefono}
              error={errors.telefono ? true : false}
              helperText={errors.telefono && errors.telefono}
              onChange={handleChange}
              onKeyUp={handleInputPress}
            />
          </div>
          <div className="registro__containerInput">
            <TextField
              className="registro__input"
              label="Correo Electrónico"
              name="correo"
              type="email"
              value={correo}
              error={errors.correo ? true : false}
              helperText={errors.correo && errors.correo}
              onChange={handleChange}
              onKeyUp={handleInputPress}
            />
          </div>
          <div className="btnImage">
            <input
              accept="image/*"
              id="imageBtn"
              type="file"
              onChange={handleChangeInputImg}
              style={{ display: "none" }}
            />

            <label htmlFor="imageBtn">
              <Button
                variant="outlined"
                component="span"
                style={{ width: "100%", padding: "10px 0" }}
              >
                {/* <FontAwesomeIcon
                  style={{
                    fontSize: "1.5rem",
                    color: "black",
                    margin: "0 10px",
                  }}
                  icon={faImage}
                /> */}
                <p>Añadir imagen</p>
              </Button>
              {imgPaquete && (
                <img
                  alt="evidencia"
                  className="imgPaquete"
                  ref={refImage}
                  src=""
                ></img>
              )}
            </label>
          </div>

          <Button
            variant="contained"
            color="primary"
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
            REGÍSTRATE
          </Button>
          <Link
            style={{ display: "block", margin: "8px 0" }}
            className="forgotPass"
            to="/auth/user/login"
          >
            ¿Ya tienes una cuenta? Inicia sesión
          </Link>
        </form>
      </div>
      <div className="capaLogo">
        <img></img>
      </div>
      <Alerta
        open={open}
        message={message}
        emoji={emoji}
        handleClose={handleClose}
      />
    </div>
  );
};
