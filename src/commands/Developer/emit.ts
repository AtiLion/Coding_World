import {CommandBase} from "../../bases/CommandBase";
import {CommandContext} from "../../types/CommandContext";
import {Command} from "../../decorators/CommandDecorators";
import {CodingWorld} from "../../CodingWorld";
import {GuildMember} from "discord.js";

@Command.name("emit")
@Command.usages("m!emit <event name>")
@Command.description("Emits an event.")
@Command.modOnly
@Command.adminOnly
export default class extends CommandBase {
    async invoke(ctx: CommandContext) {
        switch(ctx.args[0].toLowerCase()) {
            case "guildmemberadd":
                CodingWorld.client.emit("guildMemberAdd", ctx.member as GuildMember);
                break;
            default:
                await ctx.send("There doesn't seem to be an event with that name, in discord.js.");
                break;
        }
    }
}
