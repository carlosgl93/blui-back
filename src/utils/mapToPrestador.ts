type NewPrestador = {
  apellidos: string;
  comoEnteraste: string;
  confirmarContrasena: string;
  contrasena: string;
  correo: string;
  error: string;
  nombre: string;
  telefono: string;
};

export const mapToPrestador = (frontPrestador: NewPrestador) => {
  const { contrasena, apellidos, correo, nombre, telefono } = frontPrestador;

  const backPrestador = {
    id: null,
    firstname: nombre,
    password: contrasena,
    lastname: apellidos,
    email: correo,
    phone: telefono
  };

  return backPrestador;
};
