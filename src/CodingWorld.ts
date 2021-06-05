import {Client, Collection} from "discord.js";
import {readdirSync} from "fs";
import {CommandBase} from "./bases/CommandBase";
import {EventBase} from "./bases/EventBase";
import {MonitorBase} from "./bases/MonitorBase";

/**
 * @namespace CodingWorld - This namespace is the heart of the bot.
 */
export namespace CodingWorld {
    export const client = new Client();
    // Collections
    export const commands = new Collection<string, CommandBase>();
    export const events = new Collection<string, EventBase>();
    export const monitors = new Collection<string, MonitorBase>();

    export async function loadFiles() {

        /* -------------------------------- Commands -------------------------------- */

        let categories = readdirSync(`${__dirname}/commands`);
        for(const category of categories) {
            const _commands = readdirSync(`${__dirname}/commands/${category}`).filter(d => d.endsWith(".ts"));
            for(const command of _commands) {
                const {default: module} = await import(`./commands/${category}/${command}`);
                const cmd = new module();
                cmd.category = category;
                commands.set(cmd.name, cmd);
                console.log(`Command ${cmd.name} was loaded.`);
            }
        }

        /* ---------------------------------- Event --------------------------------- */

        categories = readdirSync(`${__dirname}/events`);
        for(const category of categories) {
            const _events = readdirSync(`${__dirname}/events/${category}`).filter(d => d.endsWith(".ts"));
            for(const event of _events) {
                const {default: module} = await import(`./events/${category}/${event}`);
                const evt = new module();

                events.set(evt.name, evt);
                console.log(`Event ${evt.name} was loaded.`);
            }
        }

        /* -------------------------------- Monitors -------------------------------- */

        categories = readdirSync(`${__dirname}/monitors`);
        for(const category of categories) {
            const _monitors = readdirSync(`${__dirname}/monitors/${category}`).filter(d => d.endsWith(".ts"));
            for(const monitor of _monitors) {
                const {default: module} = await import(`./monitors/${category}/${monitor}`);
                const mon = new module();

                monitors.set(mon.name, mon);
                console.log(`Monitor ${mon.name} was loaded.`);
            }
        }
    }
    export async function startBot() {
        await loadFiles();
        events.forEach((event) => {
            client.on(event.name, async (...args: any[]) => await event.invoke(...args));
            console.log(`Event ${event.name} has been registered.`);
        });
        await client.login(process.env.TOKEN);
    }
}
