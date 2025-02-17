// socket.js
import { io } from "socket.io-client";

// Initialize the socket but do NOT auto-connect
const socket = io("http://localhost:5000", {
    autoConnect: false,  // Prevents automatic connection
    // withCredentials: true, // Allows cookies if needed for authentication
});

export default socket;
