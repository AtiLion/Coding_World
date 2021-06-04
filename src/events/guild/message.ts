import {EventBase} from "../../bases/EventBase";
import {Event} from "../../decorators/EventDecorators";
import {Message} from "discord.js";
import {CodingWorld} from "../../CodingWorld";

@Event.name("message")
export default class extends EventBase {
    async invoke(message: Message) {
        await CodingWorld.monitors.get("commandHandler")!.invoke(message);
    }
}
