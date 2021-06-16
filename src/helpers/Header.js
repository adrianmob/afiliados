import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

export const Header = () => {
  const history = useHistory();

  const handleOut = () => {
    history.push("/auth/");
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <h2 style={{ flexGrow: "1" }}>RocaFunnels</h2>
        <Button
          onClick={() => {
            handleOut();
          }}
          color="inherit"
        >
          Salir
        </Button>
      </Toolbar>
    </AppBar>
  );
};
