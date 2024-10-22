import prisma from '../../lib/prisma';

export async function getServerSideProps(context) {
  const { codigo } = context.params;
  const cliente = await prisma.cliente.findUnique({
    where: { codigo },
  });

  if (!cliente) {
    return {
      notFound: true,
    };
  }

  return {
    props: { cliente },
  };
}

export default function Cliente({ cliente }) {
  return (
    <div>
      <h1>Cliente: {cliente.nombre}</h1>
      <p>Código: {cliente.codigo}</p>
      <p>Email: {cliente.email}</p>
      <p>Teléfono: {cliente.telefono}</p>
    </div>
  );
}
