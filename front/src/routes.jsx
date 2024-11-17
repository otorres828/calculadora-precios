import {
  HomeIcon,
  TableCellsIcon,
} from "@heroicons/react/24/solid";
import Usuarios from "./pages/dashboard/usuarios";
import Ingredientes from "./pages/dashboard/Ingredientes";


const token = localStorage.getItem("token");
const icon = {
  className: "w-5 h-5 text-inherit",
};

const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Recetas",
        path: "",
        element: <Usuarios token={token}/>,
      },
      
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Usuarios",
        path: "/ingredientes",
        element: <Ingredientes token={token}/>,
      },
     
    ],
  },

];

export default routes;
