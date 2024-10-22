import { useState } from 'react';
import { useRouter } from 'next/router';

export default function NuevoCliente() {
  const [codigo, setCodigo] = useState('');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const router = useRouter();

  const crearCliente = async (e) => {
    e.preventDefault();
    await fetch('/api/clientes', {
      method: 'POST',
      body: JSON.stringify({ codigo, nombre, email, telefono }),
      headers: { 'Content-Type': 'application/json' },
    });
    router.push('/clientes');
  };

  return (
    <form onSubmit={crearCliente}>
      <input
        type="text"
        placeholder="Código"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
      />
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
      <button type="submit">Crear Cliente</button>
    </form>
  );
}
