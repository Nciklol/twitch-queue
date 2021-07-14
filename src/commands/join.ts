import Command from "../Command";
import { Userstate } from "tmi.js";

export default class JoinCommand extends Command {
    constructor() {
        super("join")
    }

    public exec(target: string, message: string, args: string[], context: Userstate) {
        if (this.queue.has(context['user-id'])) {
            return this.client.say(target, "You are already in the queue!")
        } else {
            this.queue.set(context['user-id'], context['display-name'])
            return this.client.say(target, `Sucessfully added ${context['display-name']} to the queue. You're in position ${this.queue.size}.`)
        }
    }
}