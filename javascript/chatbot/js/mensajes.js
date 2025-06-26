// Creating a class that gives the structure for the objects

export class ChatMessage {
    constructor(autor,content) {
        this.autor = autor;
        this.content = content;
        this.timestamp = new Date();
    }

    showing () {
        return `${this.autor} (${this.timestamp.toLocaleTimeString()}): ${this.content}`
    }

}





