import { Client, Userstate } from "tmi.js"
import * as fs from "fs";
import Command from "./Command";
import { Collection } from "@discordjs/collection";

export default class CommandHandler {
    private client: Client
    private queue: Collection<string, string>
    
    public commands: Command[] = [];

    private parties = new Collection<string, string[]>();

    constructor(client: Client, queue: Collection<string, string>) {
        this.client = client;
        this.queue = queue;

        this.init();
    }

    private async init() {
        let files = fs.readdirSync("./commands");
        files = files.filter(f => ["js", "ts"].includes(f.split(".").pop()))

        for (const read of files) {
            const file = require(`./commands/${read}`)

            const command: Command = new file.default();

            command.client = this.client;
            command.queue = this.queue;
            command.parties = this.parties;

            this.commands.push(command);
        }

        this.setup();
    }

    private setup() {
        let queueOpen = false;
        this.client.on("message", (target, context, message) => {

            if (message.startsWith("!open") && (context['mod'] || context['badges']?.broadcaster)) {
                if (queueOpen) return this.client.say(target, "The queue is already open!")
                queueOpen = true;
                return this.client.say(target, "The queue is now open!")
            } else if (message.startsWith("!close") && (context['mod'] || context['badges']?.broadcaster)) {
                if (!queueOpen) return;
                queueOpen = false;
                this.queue.clear();
                return this.client.say(target, "The queue is closed!");
            }

            if (!queueOpen) return;
            this.handle(context, message, target);
        })
    }

    private handle(context: Userstate, message: string, target: string) {
        const command = message.split(/ +/)[0].slice(1);
        const args = message.split(/ +/).slice(1);


        const file = this.commands.find(c => typeof c.id == "string" ? c.id == command : c.id.includes(command))
        
        if (!file) return;

        if (file.modOnly) {
            if (!context['mod'] && !context['badges']?.broadcaster) return;
        }
        file.exec(target, message, args, context);

    }
}