import {MonitorBase} from "../../bases/MonitorBase";
import {Monitor} from "../../decorators/MonitorDecorators";
import {Message, MessageEmbed} from "discord.js";
import {CodingWorld} from "../../CodingWorld";
import {CommandContext} from "../../types/CommandContext";
import {CommandBase} from "../../bases/CommandBase";
import {Command} from "../../decorators/CommandDecorators";
import db from "quick.db";
import moment from "moment";
/**
 * Parses the arguments from the message's content.
 * @param content - The message content
 * @returns The arguments in a string array
 */
export function parseArguments(content: string) {
    return content.slice((process.env.PREFIX as string).length).trim().split(/ +/g);
}
/**
 * Checks if the content starts with the prefix.
 * @param content - The message content
 * @returns Whether the content has the prefix or not.
 */
export function hasPrefix(content: string) {
    return content.toLowerCase().trim().startsWith(process.env.PREFIX as string);
}
/**
 * 
 * @param commandName - The command's name, that you want to parse
 * @returns Returns the command if found. If it doesn't exist, then it will return null.
 */
export function parseCommand(commandName: string) {
    return CodingWorld.commands.get(commandName) || CodingWorld.commands.find(cmd => cmd.aliases.includes(commandName));
}

export function handleCooldown(command: CommandBase, ctx: CommandContext) {
    if(command.cooldown === 0) return true;
    if(db.has(`${ctx.userId}_command_${command.name}.cooldown`)) {
        if((db.get(`${ctx.userId}_command_${command.name}.cooldown`) as number) <= Date.now()) return true;
        else return false;
    } else return true;
}

export namespace CommandPreconditions {
    export function ownerOnly(command: CommandBase, ctx: CommandContext) {
        return ctx.member?.roles.cache.find(r => r.name === "Acting Owner") !== null;
    }

    export function adminOnly(command: CommandBase, ctx: CommandContext) {

        return !command.adminOnly ? true : (ctx.member?.roles.cache.find(r => r.name === "Admin") !== null) && ownerOnly(command, ctx);
    }

    export function modOnly(command: CommandBase, ctx: CommandContext) {
        return !command.modOnly ? true : (ctx.member?.roles.cache.find(r => r.name === "Moderator") !== null) && adminOnly(command, ctx) && ownerOnly(command, ctx);
    }

    export function guildOnly(command: CommandBase, ctx: CommandContext) {
        return !command.guildOnly ? true : (ctx.guild !== null);
    }

    export function dmOnly(command: CommandBase, ctx: CommandContext) {
        return !command.dmOnly ? true : (ctx.channel.type === "dm");
    }
    
    export function botPermissions(command: CommandBase, ctx: CommandContext) {
        return command.botPermissions.length === 0 ? true : ctx.self?.hasPermission(command.botPermissions);
    }

    export function userPermissions(command: CommandBase, ctx: CommandContext) {
        return command.userPermissions.length === 0 ? true : ctx.member?.hasPermission(command.userPermissions);
    }
}


@Monitor.name("commandHandler")
export default class extends MonitorBase {
    async invoke(message: Message) {
        if(message.author.bot) return;

        if(!hasPrefix(message.content)) return;

        const args = parseArguments(message.content);
        const command = parseCommand(args.shift()!.toLowerCase()!);

        if(!command) return;
        
        const ctx = new CommandContext(message, args);

        /* ------------------------------ Preconditions ----------------------------- */

        if(!CommandPreconditions.dmOnly(command, ctx)) {
            ctx.send("This command can only be used by owner, and admin.");
            return;
        }

        if(!CommandPreconditions.dmOnly(command, ctx)) {
            ctx.send("This command can only be used in dms.");
            return;
        }

        if(!CommandPreconditions.guildOnly(command, ctx)) {
            ctx.send("This command can only be used in the server.");
            return;
        }

        if(!CommandPreconditions.modOnly(command, ctx)) {
            ctx.send("This command can only be used by owner, admin, and mods.");
            return;
        }

        if(!CommandPreconditions.ownerOnly(command, ctx)) {
            ctx.send("This command can only be use by owners.");
            return;
        }

        if(!handleCooldown(command, ctx)) {
            ctx.send(`You can not use this command for another ${moment().add(db.get(`${ctx.userId}_command_${command.name}.cooldown`) as number, "milliseconds").minutes()} minute(s)`)
            return;
        }


        try {
             await command.invoke(ctx);
        } catch(error) {
            const embed = new MessageEmbed();
            embed.setTitle("An error has occurred");
            embed.setDescription(`\`\`\`${error}\`\`\``);
            embed.setColor("RED");

            message.channel.send(embed);
        }
    }
}
