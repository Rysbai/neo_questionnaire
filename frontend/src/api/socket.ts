import io from 'socket.io-client';

import config from "../configs";


export function connectToSocket(): SocketIOClient.Socket {
  return io.connect(config.PROXY_URL + '/update-question-results', {transports: ['websocket']});
}
