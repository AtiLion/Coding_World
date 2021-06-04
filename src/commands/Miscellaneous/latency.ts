import {CommandBase} from "../../bases/CommandBase";
import {Command} from "../../decorators/CommandDecorators";
import {CommandContext} from "../../types/CommandContext";

@Command.name("latency")
@Command.aliases("ping")
@Command.description("Displays the bot's current latency")
@Command.usages(";latency", ";ping")
export default class extends CommandBase {
    async invoke(ctx: CommandContext) {
        await ctx.send("Pong!");
    }
}
