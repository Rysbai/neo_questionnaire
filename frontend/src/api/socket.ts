import io from 'socket.io-client';

import config from "../configs";


export function connectToSocket(): SocketIOClient.Socket {
  return io(config.PROXY_URL);
}
