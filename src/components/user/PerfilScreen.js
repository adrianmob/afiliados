import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import axios from "axios";
import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { Header } from "../../helpers/Header";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { useParams } from "react-router-dom";
import { useForm } from "../../hooks/useForm";

export const PerfilScreen = () => {
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3001/api/v1/afiliados/${id}`).then((user) => {
      console.log(user);
      setUser(user.data);
    });
  }, []);

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const editOpen = () => {
    setOpen(true);
  };

  const [{ banco, cuenta }, handleChange] = useForm({
    banco: "",
    cuenta: "",
  });

  const [
    { apellidoMaterno, apellidoPaterno, email, nombre, telefono, urlImagen },
    setUser,
  ] = useState({
    apellidoMaterno: "",
    apellidoPaterno: "",
    email: "",
    nombre: "",
    telefono: "",
    urlImagen: "",
  });

  return (
    <div>
      <Header />
      <main style={{ padding: "30px 0 0 80px" }}>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "800",
            margin: "10px 0 20px 0",
          }}
        >
          Perfil
        </h2>
        <Card style={{ width: "400px" }}>
          <CardContent>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  margin: "0 auto",
                }}
              >
                <img
                  src={urlImagen}
                  style={{
                    width: "100%",
                    objectFit: "cover",
                    objectPosition: "top",
                    height: "100%",
                  }}
                ></img>
              </div>
              <h1
                style={{
                  fontSize: "24px",
                  textAlign: "center",
                  textTransform: "capitalize",
                }}
              >
                {nombre} {apellidoPaterno} {apellidoMaterno}
              </h1>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <p
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "blue",
                    }}
                  >
                    300
                  </p>
                  <p style={{ fontWeight: "500" }}>Afiliados</p>
                </div>
                <div style={{ textAlign: "center" }}>
                  <p
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "blue",
                    }}
                  >
                    250
                  </p>
                  <p style={{ fontWeight: "500" }}>Ventas</p>
                </div>
                <div style={{ textAlign: "center" }}>
                  <p
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "blue",
                    }}
                  >
                    3049
                  </p>
                  <p style={{ fontWeight: "500" }}>Posts</p>
                </div>
              </div>
              <div style={{ borderTop: "1px solid #b3b3b3" }}>
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    color: "#a3a3f7",
                  }}
                >
                  Detalles
                </p>
                <div className="contenedor_info" style={{ margin: "30px 0" }}>
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: "700",
                      color: "#9a9a9a",
                      margin: "4px 0",
                    }}
                  >
                    Correo electronico
                  </p>
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      margin: "4px 0",
                    }}
                  >
                    {email}
                  </p>
                </div>
                <div className="contenedor_info">
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: "700",
                      color: "#9a9a9a",
                      margin: "4px 0",
                    }}
                  >
                    Telefono
                  </p>
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      margin: "4px 0",
                    }}
                  >
                    {telefono}
                  </p>
                </div>
                <Button
                  onClick={() => {
                    editOpen();
                  }}
                  variant="contained"
                  style={{
                    width: "100%",
                    display: "block",
                    padding: "15px 0",
                    margin: "15px 0",
                    maxWidth: "400px",
                  }}
                  color="primary"
                  type="submit"
                >
                  Editar informacion
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent className="alertaContainer">
          <div className="registro__containerInput">
            <TextField
              className="registro__input"
              label="Cuenta Bancaria"
              name="cuenta"
              type="text"
              value={cuenta}
              // error={errors.apellidoMat ? true : false}
              // helperText={errors.apellidoMat && errors.apellidoMat}
              onChange={handleChange}
              // onKeyUp={handleInputPress}
            />
          </div>
          <div className="registro__containerInput">
            <TextField
              className="registro__input"
              label="Banco"
              name="banco"
              type="text"
              value={banco}
              // error={errors.apellidoMat ? true : false}
              // helperText={errors.apellidoMat && errors.apellidoMat}
              onChange={handleChange}
              // onKeyUp={handleInputPress}
            />
          </div>
          <Button
            onClick={() => {
              handleClose();
            }}
            variant="contained"
            style={{
              width: "100%",
              display: "block",
              padding: "15px 0",
              margin: "15px 0",
              maxWidth: "400px",
            }}
            color="primary"
            type="submit"
          >
            Guardar
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};
