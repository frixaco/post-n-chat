import io from "socket.io-client";

const socket = io.connect('/', { 'sync disconnect on unload': false })

export default socket