import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { useSnackbar } from "notistack";
import ProductList from "../../components/ProductList";

function Usuarios() {

  return (
    <div className="mt-12 mx-0 md:mx-8 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Recetas
          </Typography>
        </CardHeader>
        <CardBody className="px-0 pt-0 pb-2">
          <ProductList />        
        </CardBody>
      </Card>
      
    </div>
  );
}

export default Usuarios;
