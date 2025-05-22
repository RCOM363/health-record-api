import { Router, Request,Response } from "express";

const router = Router();

let clients: Response[] = [];

router.route("/health-updates").get((req:Request, res:Response) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-control","no-cache");
    res.setHeader('Connection', 'keep-alive');

    console.log("Client connected to SSE");

    // Add client to the list
    clients.push(res);

     // On client disconnect, remove from list
    req.on("close", () => {
    console.log("Client disconnected from SSE");
    clients = clients.filter(client => client !== res);
    });

})

export const sendHealthUpdates = (message: string) => {
    for (const client of clients) {
        client.write(`${message}\n`);
    }
}

export {router as sseRoutes};