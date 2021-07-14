import Command from "../Command";
import { Userstate } from "tmi.js";

export default class LeaveCommand extends Command {
    constructor() {
        super('leave');
    }

    public exec(target: string, message: string, args: string[], context: Userstate) { 
        if (!this.queue.has(context['user-id'])) return this.client.say(target, "You're not in the queue!");
        this.queue.delete(context['user-id']);
        return this.client.say(target, "Removed you from the this.queue.")
    }
}