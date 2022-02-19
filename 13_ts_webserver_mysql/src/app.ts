import dotenv from 'dotenv';
//configurar dotenv
dotenv.config();

import Server from './models/server';

console.log('puerto---',process.env.PORT);


const server = new Server();

server.listen();
