import Command from "../Command";

export default class ClearCommand extends Command {
    constructor() {
        super("clear", true);
    }

    public exec(target: string, message: string) {
        this.queue.clear();
        return this.client.say(target, 'The queue is cleared!')
    }
}