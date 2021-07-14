import Command from "../Command";

export default class NextCommand extends Command {
    constructor() {
        super("next")
    }

    public exec(target: string, message: string) {
        if (this.queue.size == 0) return this.client.say(target, "There is nobody in the queue!");

        let numberCheck1 = message.split(/ +/).slice(1)[0];
        let number1: number;
        if (!numberCheck1 || !Number(numberCheck1) || Number(numberCheck1) > 10) number1 = 3 - 1;
        else number1 = Number(numberCheck1) - 1;

        let str = "Next up: ";
        for (let i = 0; i < this.queue.size; i++) {
            if (i > number1) break;
            str += `${this.queue.array()[i]}, `;
        }
        str = str.substr(0, str.length - 2);
        return this.client.say(target, str);
    }
}