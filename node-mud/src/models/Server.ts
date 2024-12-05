// Placeholder for a server class to manage connections
export class Server {
    private server: import('net').Server;

    constructor() {
        this.server = require('net').createServer(this.onConnection.bind(this));
    }

    public start(port: number): void {
        this.server.listen(port, () => {
            console.log(`MUD server is listening on port ${port}`);
        });
    }

    private onConnection(socket: Socket): void {
        // Create a new character or load from database based on login
        const newPlayer = new Character('NewPlayer'); // Placeholder name
        newPlayer.socket = socket;

        socket.on('data', (data: Buffer) => {
            newPlayer.handleInput(data.toString().trim());
        });

        socket.on('close', () => {
            console.log(`${newPlayer.name} has disconnected.`);
            newPlayer.socket = undefined;
        });

        socket.on('error', (err) => {
            console.error(`Socket error for ${newPlayer.name}:`, err);
        });

        // Send welcome message or start login process
        newPlayer.send("Welcome to the MUD! What is your name?");
    }
}