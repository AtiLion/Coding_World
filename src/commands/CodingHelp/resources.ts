import { Collection, MessageEmbed } from "discord.js";
import { CommandBase } from "../../bases/CommandBase";
import { Command } from "../../decorators/CommandDecorators";
import { CommandContext } from "../../types/CommandContext";

@Command.name("resources")
@Command.description("Gives you resources that you can use to learn about a certain language, or profession, or even discord libraries.")
@Command.usages(";resources (the resource you want to get)")
@Command.aliases("docs")
export default class extends CommandBase {
	async invoke(ctx: CommandContext) {
		const resources = new Collection<string, ResourceData>();
		resources.set("discord.js", {
			key: "discord.js",
			lang: "js",
			search: ["d.js"],
			description: "Discord.js is a Discord Library for javascript.",
			resources: [
				{
					title: "Docs",
					description: "These are the docs for discord.js.",
					url: "https://discord.js.org/#/"
				},
				{
					title: "Guides",
					description: "These are guides for discord.js",
					url: "https://discordjs.guide"
				}
			],
			examples: 
				"const Discord = require('discord.js');\n" +
				"\n"+
				"const client = new Discord.Client();\n"+
				"\n"+
				"client.on('ready', () => {\n" +
				"\tconsole.log('Ready');\n" +
				"});\n" +
				"\n" + 
				"client.on('message', (message) => {\n" +
				"\tif(message.author.bot) return;\n" +
				"\tswitch(message.content.toLowerCase().trim()) {\n" +
				"\t\tcase '!ping'\n" + 
				"\t\t\tmessage.channel.send('Pong!');\n" + 
				"\t\tbreak;\n" +
				"\t}\n" +
				"})\n" +
				"\n" +
				"// Place your bot token in instead of 'YOUR_BOT_TOKEN'\n"+
				"client.login('YOUR_BOT_TOKEN');"
			
		})
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

type ResourceData = {
	key: string;
	search: string[]
	description: string;
	lang: string;
	resources: {
		title: string;
		description: string;
		url: string;
	}[];
	examples: string;
};