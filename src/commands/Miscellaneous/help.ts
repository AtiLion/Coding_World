import { MessageEmbed } from "discord.js";
import moment from "moment";
import { CommandBase } from "../../bases/CommandBase";
import { CodingWorld } from "../../CodingWorld";
import { Command } from "../../decorators/CommandDecorators";
import { CommandContext } from "../../types/CommandContext";

@Command.name("help")
@Command.aliases("command", "commands")
@Command.description("Displays a list of commands, or information about a specific command.")
@Command.usages(";help (command name)", ";command (command name)", ";commands (command Name)")
export default class extends CommandBase {
	async invoke(ctx: CommandContext) {
		const embed = new MessageEmbed();
		embed.setColor("RANDOM");
		const commands = CodingWorld.commands;
		if(!ctx.args.length) {
			embed.setTitle(`This is all of the commands that you can use.`);
			embed.setDescription(`There is a total of ${commands.size} commands`);
			let categories: string[] = []; 
			commands.forEach(cmd => {
				if(!categories.includes(cmd.category)) categories.push(cmd.category);
			});

			for(const category of categories) {
				let cmds: CommandBase[] = [];
				commands.forEach(cmd => {
					if(cmd.category === category) cmds.push(cmd);
				});
				let desc = "";
				for(let cmd of cmds) {
					desc += `- ${cmd.name}\n`;
				}
				embed.addField(`> ${category}`, `${desc}`);
				
			} 
		} else {
			const command = commands.get(ctx.args.join(" ")) || commands.find(cmd => cmd.aliases.includes(ctx.args.join(" ")));

			if(!command) {
				ctx.send(`There doesn't seem to be a command with a name or aliases of ${ctx.args.join(" ")}`);
				return;
			}

			embed.setTitle(`Information on ${command.name}`);
			embed.setDescription(`**Aliases**: \`${command.aliases.join(", ")}\`\n**Usages**: \`${command.usages.join(", ")}\`\n**Description:** ${command.description}`);
			if(command.cooldown > 0) embed.addField("Cooldown", `${moment(command.cooldown).minutes()} minute(s)`);
			if(command.guildOnly) embed.addField("Guild Only", '\u200b');
			if(command.dmOnly) embed.addField("Dm Only", '\u200b');
			if(command.adminOnly) embed.addField("Admin and Owner Only", '\u200b');
			if(command.modOnly) embed.addField("Mod, Admin, and Owner Only", '\u200b');
			
			if(command.botPermissions.length > 0) {
				let list = "";
				command.botPermissions.forEach(perms => {
					if(ctx.self?.hasPermission(perms)) list += `✅ - ${perms}\n`;
					else list += `❌ - ${perms}\n`;
				});

				embed.addField("Bot Permissions", `${list}`);
			}

			if(command.userPermissions.length > 0) {
				let list = "";
				command.userPermissions.forEach(perms => {
					if(ctx.member?.hasPermission(perms)) list += `✅ - ${perms}\n`;
					else list += `❌ - ${perms}\n`;
				});

				embed.addField("User Permissions", `${list}`);
			}
		}
		ctx.send(embed);
	}
}