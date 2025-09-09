import { io } from "socket.io-client";
import { socketApi } from "./apis.js";

const socket = io(socketApi);


export default socket;