import { Collection, MessageEmbed } from "discord.js";
import { CommandBase } from "../../bases/CommandBase";
import { Command } from "../../decorators/CommandDecorators";
import { CommandContext } from "../../types/CommandContext";
import { resources } from "../../data/Resources";

@Command.name("resources")
@Command.description("Gives you resources that you can use to learn about a certain language, or profession, or even discord libraries.")
@Command.usages(";resources (the resource you want to get)")
@Command.aliases("docs")
export default class extends CommandBase {
	async invoke(ctx: CommandContext) {

		if(!ctx.args.length) {
			const embed = new MessageEmbed();

			embed.setTitle("Here are all of the resources that I current have.");
			embed.setDescription("You can request for a certain resource if i have it, but using this command again, and adding the resource name after the command name.\nExample for Javascript - `;resources javascript` or `;resources js`");
			embed.setColor("BLUE");
			resources.forEach(resource => {
				embed.addField(`${resource.key}`, `Other names: ${resource.search.join(", ")}`);
			});

			ctx.send(embed);

		} else {
			const resource = resources.get(ctx.args.join(" ").trim().toLowerCase()) || resources.find(r => r.search.includes(ctx.args.join(" ").trim().toLowerCase()));

			if(!resource) {
				ctx.send("Doesn't seem like i have any resources by that name.");
				return;
			}

			const embed = new MessageEmbed();
			embed.setTitle(`Resources for ${resource.key}`);

			embed.setDescription(`Description: ${resource.description}\n\`\`\`${resource.lang}\n${resource.examples}\`\`\``);
			embed.setColor("RANDOM")
			for(const _resource of resource.resources) {
				embed.addField(`Resource: ${_resource.title}`, `[Link](${_resource.url})\nDescription: ${_resource.description}`);
			}

			ctx.send(embed);
		}
	}
}

