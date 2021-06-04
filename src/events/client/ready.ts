import {EventBase} from "../../bases/EventBase";
import {Event} from "../../decorators/EventDecorators";

@Event.name("ready")
export default class extends EventBase {
    async invoke() {
        console.log("Ready");
    }
}
