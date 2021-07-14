import { Userstate, Client } from "tmi.js";
import { Collection } from "@discordjs/collection";
export default class Command {
    public id: string | string[];
    public client: Client;
    public modOnly: boolean;
    public queue: Collection<string, string>;
    public parties: Collection<string, string[]>;

    constructor(id: string | string[], modOnly?: boolean) {
        this.id = id;
        this.modOnly = modOnly;
    } 
    
    public exec(target: string, message: string, args: string[], context: Userstate) {
        throw new Error("Execute Method not implemented!")
    }
}