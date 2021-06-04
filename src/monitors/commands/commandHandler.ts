import {MonitorBase} from "../../bases/MonitorBase";
import {Monitor} from "../../decorators/MonitorDecorators";
import {Message, MessageEmbed} from "discord.js";
import {CodingWorld} from "../../CodingWorld";
import {CommandContext} from "../../types/CommandContext";
import {CommandBase} from "../../bases/CommandBase";
import {Command} from "../../decorators/CommandDecorators";

export function parseArguments(content: string) {
    return content.slice((process.env.PREFIX as string).length).trim().split(/ +/g);
}
export function hasPrefix(content: string) {
    return content.toLowerCase().trim().startsWith(process.env.PREFIX as string);
}
export function parseCommand(commandName: string) {
    return CodingWorld.commands.get(commandName) || CodingWorld.commands.find(cmd => cmd.aliases.includes(commandName));
}

export namespace CommandPreconditions {
    export function ownerOnly(command: CommandBase, ctx: CommandContext) {
        return ctx.member?.roles.cache.find(r => r.name === "Acting Owner") !== null;
    }

    export function adminOnly(command: CommandBase, ctx: CommandContext) {

        return !command.adminOnly ? true : (ctx.member?.roles.cache.find(r => r.name === "Admin") !== null) && ownerOnly(command, ctx);
    }

    export function modOnly(command: CommandBase, ctx: CommandContext) {
        return !command.modnOnly ? true : (ctx.member?.roles.cache.find(r => r.name === "Moderator") !== null) && adminOnly(command, ctx) && ownerOnly(command, ctx);
    }

    export function guildOnly(command: CommandBase, ctx: CommandContext) {
        return !command.guildOnly ? true : (ctx.guild !== null);
    }

    export function dmOnly(command: CommandBase, ctx: CommandContext) {
        return !command.dmOnly ? true : (ctx.channel.type === "dm");
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
