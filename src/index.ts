import {config} from "dotenv";
import {CodingWorld} from "./CodingWorld";
import startBot = CodingWorld.startBot;

config();

startBot().then(r => {
}).catch(error => {
    console.error(error);
});
