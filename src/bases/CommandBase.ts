import {Message, PermissionResolvable} from "discord.js";
import {CommandContext} from "../types/CommandContext";


export class CommandBase {
    name!: string;
    aliases: string[] = [];
    description: string = "No description was provided.";
    usages: string[] = [];
    botPermissions: PermissionResolvable[] = [];
    userPermissions: PermissionResolvable[] = [];
    allowRoles: string[] = [];
    denyRoles: string[] = [];
    enabled: boolean = true;
    adminOnly: boolean = false;
    modOnly: boolean = false;
    guildOnly: boolean = false;
    dmOnly: boolean = false;
    cooldown: number = 0;
    category: string = "Uncategorized";
    
    async invoke(ctx: CommandContext) {
        console.log("Not yet implemented");
    }
}


