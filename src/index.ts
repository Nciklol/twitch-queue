import { config } from "dotenv";
import { client, Options } from "tmi.js"
config({ path: "../../.env" });
import Collection from '@discordjs/collection'; // A collection is a map with extra utility methods, docs for it: https://discord.js.org/#/docs/collection/master/class/Collection

const channels = ['example-channel'] // Supports only 1 channel currently

const opts: Options = {
    identity: {
        username: process.env.TWITCH_USERNAME,
        password: process.env.TWITCH_KEY
    },
    channels
}

const twitch = new client(opts);

const queue = new Collection<string, string>();

let queueOpen = false;

twitch.on("connected", (addr, port) => {
    console.log(`Logged in to: ${addr}:${port}`)
})

twitch.on("message", (target, context, message) => {
    if (twitch.getOptions().identity.username === context['username']) return;
    message = message.toLowerCase();
    

    if (message.startsWith("!open") && (context['mod'] || context['badges']?.broadcaster)) {
        if (queueOpen) return twitch.say(target, "The queue is already open!")
        queueOpen = true;
        return twitch.say(target, "The queue is now open!")
    } else if (message.startsWith("!close") && (context['mod'] || context['badges']?.broadcaster)) {
        if (!queueOpen) return;
        queueOpen = false;
        queue.clear();
        return twitch.say(target, "The queue is closed!");
    }

    if (!queueOpen) return;

    switch (message.split(/ +/)[0]) {
        case "!join":
            if (queue.has(context['user-id'])) {
                return twitch.say(target, "You are already in the queue!")
            } else {
                queue.set(context['user-id'], context['display-name'])
                return twitch.say(target, `Sucessfully added ${context['display-name']} to the queue. You're in position ${queue.size} `)
            }
        case "!list":
            if (queue.size == 0) return twitch.say(target, "There is nobody in queue!");

            let list = "";

            for (let i = 0; i < queue.size; i++) {
               if (list.length + queue.array()[i].length > 500) break;
               list += `${queue.array()[i]}, `
            }

            list = list.substr(0, list.length - 2)
            return twitch.say(target, list);
        case "!next":
            if (queue.size == 0) return twitch.say(target, "There is nobody in queue!");

            let numberCheck1 = message.split(/ +/).slice(1)[0];
            let number1: number;
            if (!numberCheck1 || !Number(numberCheck1) || Number(numberCheck1) > 10) number1 = 3 - 1;
            else number1 = Number(numberCheck1) - 1;

            let str = "Next up: ";
            for (let i = 0; i < queue.size; i++) {
                if (i > number1) break;
                str += `${queue.array()[i]}, `;
            }
            str = str.substr(0, str.length - 2);
            return twitch.say(target, str);
        case "!leave":
            if (!queue.has(context['user-id'])) return twitch.say(target, "You're not in the queue!");
            queue.delete(context['user-id']);
            return twitch.say(target, "Removed you from the queue.")
        case "!remove":
            if (!context['mod'] && !context['badges']?.broadcaster) return;

            if (queue.size == 0) return twitch.say(target, "There is nobody in queue!");
            let numberCheck = message.split(/ +/).slice(1)[0];
            let number: number;
            if (!numberCheck || !Number(numberCheck)) number = 1;
            else number = Number(numberCheck);

            let numDeleted = 0;
            let wentOver = false;

            for (let i = 0; i < number; i++) {
                if (queue.size == 0) { wentOver = true; break; }
                queue.delete(queue.firstKey());
                numDeleted++;
            }
            if (wentOver) {
                return twitch.say(target, `Removed ${numDeleted} user(s) from the queue! (You went over the queue size!)`)
            } else {
                return twitch.say(target, `Removed ${numDeleted} user(s) from the queue!`)
            }
        case "!clear":
            if (!context['mod'] && !context['badges']?.broadcaster) return;
            queue.clear();
            return twitch.say(target, 'The queue is cleared!')
    }
})

twitch.connect();