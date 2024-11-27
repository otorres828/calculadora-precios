import {
  HomeIcon,
  TableCellsIcon,
} from "@heroicons/react/24/solid";
import Ingredientes from "./pages/dashboard/Ingredientes";
import Recetas from "./pages/dashboard/Recetas";


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
        element: <Recetas token={token}/>,
      },
      
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Ingredientes",
        path: "/ingredientes",
        element: <Ingredientes token={token}/>,
      },
     
    ],
  },

];

export default routes;
