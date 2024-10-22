import prisma from '../../lib/prisma';

export async function getServerSideProps() {
  const clientes = await prisma.cliente.findMany();
  return {
    props: { clientes },
  };
}

export default function Clientes({ clientes }) {
  return (
    <div>
      <h1>Listado de Clientes</h1>
      <ul>
        {clientes.map((cliente) => (
          <li key={cliente.id}>
            {cliente.codigo} - {cliente.nombre} - {cliente.email} - {cliente.telefono}
          </li>
        ))}
      </ul>
    </div>
  );
}
