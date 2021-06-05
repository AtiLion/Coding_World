import { MessageEmbed } from "discord.js";
import { CommandBase } from "../../bases/CommandBase";
import { Command } from "../../decorators/CommandDecorators";
import { CommandContext } from "../../types/CommandContext";
import db from "quick.db";
@Command.name("codinghelp")
@Command.cooldown(1800000) // 30 minutes
@Command.description("Alerts coding helpers that you need help.")
@Command.aliases("ch")
@Command.usages(";codinghelp")
@Command.guildOnly
export default class extends CommandBase {
	async invoke(ctx: CommandContext) {
		const embed = new MessageEmbed();

		embed.setAuthor(`Hello there ${ctx.user.username}`, ctx.user.displayAvatarURL());
		embed.setDescription("> One of our coding helpers will be here soon to help you, if you didn't do it yet make sure to provide code, errors or the question you have!");
		embed.setColor("BLUE")
		embed.setFooter("You can use this command once every 30 minutes.");
		ctx.message.channel.send(`<@&787390215073169428>`, {embed});
		db.set(`${ctx.userId}_command_codinghelp`, {cooldown: Date.now() + this.cooldown});
		
	}
}