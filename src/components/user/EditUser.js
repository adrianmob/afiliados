import React from "react";

export const EditUser = ({ open, handleClose }) => {
  const [
    { name, apellidoPat, apellidoMat, telefono, correo },
    handleChange,
  ] = useForm({
    name: "",
    apellidoPat: "",
    apellidoMat: "",
    telefono: "",
    correo: "",
  });

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent className="alertaContainer">
          <div className="registro__containerInput">
            <TextField
              className="registro__input"
              label="Nombre"
              name="name"
              type="text"
              value={name}
              // error={errors.apellidoMat ? true : false}
              // helperText={errors.apellidoMat && errors.apellidoMat}
              onChange={handleChange}
              // onKeyUp={handleInputPress}
            />
          </div>
          <div className="registro__containerInput">
            <TextField
              className="registro__input"
              label="Apellido Paterno"
              name="apellidoPat"
              type="text"
              value={apellidoMat}
              // error={errors.apellidoMat ? true : false}
              // helperText={errors.apellidoMat && errors.apellidoMat}
              onChange={handleChange}
              // onKeyUp={handleInputPress}
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
        </DialogContent>
      </Dialog>
    </div>
  );
};
