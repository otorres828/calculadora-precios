import { useEffect, useState } from "react";
import { useLocation, Link, NavLink } from "react-router-dom";
import {
  Navbar,
  Typography,
  IconButton,
  Breadcrumbs,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  Cog6ToothIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
} from "../../context";
import { Tooltip } from "@mui/material";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar } = controller;
  const { pathname } = useLocation();
  const parts = pathname.split("/").filter((el) => el !== "");
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const layout = parts[0];  // obtiene el valor después del primer "/"
  const page = parts[1];    // obtiene el valor después del segundo "/"
  const page2 = parts[2];    // obtiene el valor después del segundo "/"
  
  function cerrarSesion(){
    localStorage.removeItem('token');
    localStorage.removeItem('permisos');
    enqueueSnackbar("Ha cerrado sesion con exito", { variant: "success" });
    navigate("/login");
  }



  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${
        fixedNavbar
          ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
          : "px-0 py-1"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex  justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize  ml-3 md:ml-8">
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${
              fixedNavbar ? "mt-1" : ""
            }`}
          >
            <Link to={`/${layout}`}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
              >
                {layout}
              </Typography>
            </Link>
            <Link to={`/${layout}/${page}`}>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {page ? page : ''}
            </Typography>
            </Link>
           
          </Breadcrumbs>
         
        </div>
        <div className="flex items-center">
            

            <Menu>
              <MenuHandler>
                <Tooltip title="Menu"  placement="bottom">
                  <IconButton variant="text" color="blue-gray">
              <Bars3Icon strokeWidth={3}  className="h-6 w-6 text-blue-gray-500" />

                  </IconButton>
                </Tooltip>

              </MenuHandler>

              <MenuList className="w-max border-0">
                <NavLink to={`/recetas`}>
                  <MenuItem className="flex items-center gap-4">
                      Recetas
                  </MenuItem>  
                </NavLink>

                
                  <NavLink to={`/recetas/ingredientes`}>
                  <MenuItem className="flex items-center gap-4">
                      Ingredientes
                  </MenuItem> 
                </NavLink>

               
                <hr/>
                <MenuItem className="flex items-center gap-4"
                    onClick={cerrarSesion}
                    >
                      Cerrar Sesion
                </MenuItem>            
              </MenuList>
            </Menu>
        </div>
      </div>
    </Navbar>
  );
}


export default DashboardNavbar;
