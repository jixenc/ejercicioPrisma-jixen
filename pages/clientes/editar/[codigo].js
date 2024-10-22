import { useState } from 'react';
import { useRouter } from 'next/router';
import prisma from '../../../lib/prisma';

export async function getServerSideProps(context) {
  const { codigo } = context.params;
  const cliente = await prisma.cliente.findUnique({
    where: { codigo },
  });

  return {
    props: { cliente },
  };
}

export default function EditarCliente({ cliente }) {
  const [nombre, setNombre] = useState(cliente.nombre);
  const [email, setEmail] = useState(cliente.email);
  const [telefono, setTelefono] = useState(cliente.telefono);
  const router = useRouter();

  const actualizarCliente = async (e) => {
    e.preventDefault();
    await fetch(`/api/clientes/${cliente.codigo}`, {
      method: 'PUT',
      body: JSON.stringify({ nombre, email, telefono }),
      headers: { 'Content-Type': 'application/json' },
    });
    router.push('/clientes');
  };

  return (
    <form onSubmit={actualizarCliente}>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
      />
      <button type="submit">Actualizar Cliente</button>
    </form>
  );
}
