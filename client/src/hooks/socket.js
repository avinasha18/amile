import { io } from "socket.io-client";
import { api } from "./apis.js";

const socket = io(api);


export default socket;