import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack';
import login from './../../images/tienda.jpg';

export function Login() {
  const navigate = useNavigate();
  const usuarioRef = useRef();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const enviarFormularioLogin = async e => {
    e.preventDefault();

    if (usuario == 'deliciouscake' && password == 'otorres828') {
      localStorage.setItem("token", 'token');
      enqueueSnackbar("Gracias por volver :D ", { variant: "success" });
      navigate("../recetas");
    }
    else
      enqueueSnackbar("Credenciales inválidas", { variant: "error" });

  };

  return (
    <>
      <img
        src={login}
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <form onSubmit={enviarFormularioLogin}>
          <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
            <CardHeader
              variant="gradient"
              color="blue"
              className="mb-4 grid h-28 place-items-center"
            >
              <Typography variant="h4" color="white" className="px-3">
                Calculadora de Costos
              </Typography>
              <Typography variant="h4" color="white" className="px-3">
                Delicious Cake
              </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <Input type="text" label="Usuario" size="lg" id="usuario"
                ref={usuarioRef}
                onChange={e => setUsuario(e.target.value)}
                value={usuario}
                autoComplete="off" />
              <Input type="password" label="Password" size="lg" id="password"
                onChange={e => setPassword(e.target.value)}
                value={password}
                autoComplete="off"
                placeholder="***********"
                required />

            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" type="submit" fullWidth>
                Iniciar Sesion
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </>
  );
}

export default Login;
