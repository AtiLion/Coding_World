import {EventBase} from "../../bases/EventBase";
import {Event} from "../../decorators/EventDecorators";
import {GuildMember, MessageEmbed, TextChannel} from "discord.js";
import {CodingWorld} from "../../CodingWorld";

@Event.name("guildMemberAdd")
export default class extends EventBase {
    async invoke(member: GuildMember) {
        const embed = new MessageEmbed();
        embed.setAuthor(member.user.tag, member.user.displayAvatarURL());
        embed.setTitle("Welcome to Coding World");
        embed.setDescription("Welcome <@" + member.user.id +">!\n**Make sure to check out these channels:**\n**🌎・<#749983749785255997>**\n**🌎・<#751173527692116158>**\n**🌎・<#811761820904849409>**");
        embed.setColor("BLUE");
        embed.setThumbnail(member.guild.iconURL()!);
        embed.setFooter(`Coding World | Member Count: ${member.guild.memberCount}・${member.joinedAt}`);
        const channel = CodingWorld.client.channels.cache.find(c => c.type === "text" && (c as TextChannel).name === "general");

        if(!channel) return;

        await (channel as TextChannel).send(embed);
    }
}
