import { config } from "dotenv";
import { client, Options } from "tmi.js"
config({ path: "../../.env" });
import Collection from "@discordjs/collection";// A collection is a map with extra utility methods, docs for it: https://discord.js.org/#/docs/collection/master/class/Collection
import CommandHandler from "./CommandHandler";

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

new CommandHandler(twitch, queue)

twitch.connect();
