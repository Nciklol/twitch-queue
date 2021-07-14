import Command from "../Command";
import { Userstate } from "tmi.js";
export default class ListCommand extends Command {
    constructor() {
        super("list")
    }

    private onCooldown: false | number = false;

    public exec(target: string, message: string, args: string[], context: Userstate) {
        if (this.onCooldown) return this.client.say(target, `Command is on cooldown for ${5 - (Date.now() - this.onCooldown) / 1000}`)
        if (this.queue.size == 0) return this.client.say(target, "There is nobody in the queue!");

        let list = "";
        let rest = 0;

        for (let i = 0; i < this.queue.size; i++) {
            if (i > 15 - 1) {
                rest++;
                continue;
            }
            list += `${this.queue.array()[i]}, `
        }

        list = `List: (${this.queue.size}) ${list.substr(0, list.length - 2)}${rest > 0 ? ` (+${rest} more)` : ""}`
        this.cooldown();
        return this.client.say(target, list);
    }

    private cooldown() {
        this.onCooldown = Date.now();

        setTimeout(() => {
            this.onCooldown = false;
        }, 5000);
    }

}