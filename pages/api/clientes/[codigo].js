import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const { codigo } = req.query;

  if (req.method === 'PUT') {
    const { nombre, email, telefono } = req.body;
    try {
      const cliente = await prisma.cliente.update({
        where: { codigo },
        data: { nombre, email, telefono },
      });
      res.status(200).json(cliente);
    } catch (error) {
        console.error('Error actualizando cliente:', error);  // Para loguear el error en la consola
        res.status(500).json({ error: 'Error actualizando cliente', details: error.message });
      }
      
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
