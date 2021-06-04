import {config} from "dotenv";
import {CodingWorld} from "./CodingWorld";
import startBot = CodingWorld.startBot;

config();

startBot().then(r => {
    console.log(r);
}).catch(error => {
    console.error(error);
});
