import { server } from "./server.js";

const port: number = 5500; //Define a porta que o servidor vai executar

//Liga o servidor HTTP
server.listen(port, () => {
    console.log(`Servidor executando no endereço: http://localhost:${port}`);
});