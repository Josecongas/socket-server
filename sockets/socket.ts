import { Socket } from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';

export const usuariosConectados = new UsuariosLista();

export const conectarCliente = (cliente: Socket, io: SocketIO.Server) => {
  const usuario = new Usuario(cliente.id);
  usuariosConectados.agregar(usuario);
};

export const desconectar = (cliente: Socket, io: SocketIO.Server) => {
  cliente.on('disconnect', () => {
    usuariosConectados.borrarUsuario(cliente.id);
    io.emit('usuarios-activos', usuariosConectados.getLista());
    console.log('Cliente desconectado');
  });
};

export const mensaje = (cliente: Socket, io: SocketIO.Server) => {
  cliente.on('mensaje', payload => {
    console.log(`Escuchando mensaje de ${JSON.stringify(payload)}`);

    io.emit('mensaje-nuevo', payload);
  });
};

export const configurarUsuario = (cliente: Socket, io: SocketIO.Server) => {
  cliente.on(
    'configurar-usuario',
    (payload: { nombre: string }, callback: Function) => {
      usuariosConectados.actualizarNombre(cliente.id, payload.nombre);

      callback({
        ok: true,
        mensaje: `Usuario ${payload.nombre}, configurado`
      });
    }
  );
  io.emit('usuarios-activos', usuariosConectados.getLista());
};

// Obtener usuarios
export const obtenerUsuarios = (cliente: Socket, io: SocketIO.Server) => {
  cliente.on('obtener-usuarios', () => {
    io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getLista());
  });
};
