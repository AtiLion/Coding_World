import {ClientEvents} from "discord.js";


export class EventBase {
    name!: string;

    async invoke(...args: any[]) {
        console.log("Not yet implemented");
    }
}
