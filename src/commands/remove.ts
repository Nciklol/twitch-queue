import Command from "../Command";

export default class RemoveCommand extends Command {
    constructor () {
        super("remove", true)
    }

    public exec(target: string, message: string) {
        if (this.queue.size == 0) return this.client.say(target, "There is nobody in queue!");
        let numberCheck = message.split(/ +/).slice(1)[0];
        let number: number;
        if (!numberCheck || !Number(numberCheck)) number = 1;
        else number = Number(numberCheck);

        let numDeleted = 0;
        let wentOver = false;

        for (let i = 0; i < number; i++) {
            if (this.queue.size == 0) { wentOver = true; break; }
            this.queue.delete(this.queue.firstKey());
            numDeleted++;
        }
        if (wentOver) {
            return this.client.say(target, `Removed ${numDeleted} user(s) from the queue! (You went over the queue size!)`)
        } else {
            return this.client.say(target, `Removed ${numDeleted} user(s) from the queue!`)
        }
    }
}