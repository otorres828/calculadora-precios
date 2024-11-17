import { saveProducts } from '../../utils/productManager.js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await saveProducts(JSON.parse(req.body));
      res.status(200).json({ message: 'Ingrediente guardados correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al guardar Ingrediente' });
    }
  }
}
