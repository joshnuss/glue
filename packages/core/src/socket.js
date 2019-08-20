import {Socket} from "phoenix"

const socket = new Socket("/socket", {params: {token: window.userToken}})

socket.connect()

export default socket
