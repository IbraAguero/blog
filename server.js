import { createServer } from "http";
import { Server as SocketIO } from "socket.io";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    handle(req, res);
  });

  const io = new SocketIO(server);

  io.on("connection", (socket) => {
    console.log("Cliente conectado");

    socket.on("newComment", (data) => {
      // Cambiado de "comment" a "newComment"
      console.log("Nuevo comentario:", data);
      // Aquí puedes emitir a otros clientes
      socket.broadcast.emit("comment", data); // Para que otros clientes reciban el comentario
    });

    socket.on("disconnect", () => {
      console.log("Cliente desconectado");
    });
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("server on port: 3000");
  });
});
