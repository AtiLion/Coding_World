import {Message, User} from "discord.js";

/**
 * This is going to be used for the invokes of the commands.
 * Its easier doing it this way, as i can just call on one parameter, instead of more than one.
 */
export class CommandContext {
    /**
     * 
     * @param _message - This contains the current Message Object that the client recent received.
     * @param _args - This is the arguments from the content of the message.
     */
    constructor(
        private _message: Message,
        private _args: string[]
    ) {}
    
    public get message() { return this._message; }
    public get args() { return this._args; }
    public get content() { return this._message.content; }
    public get guild() { return this._message.guild; }
    public get guildId() { return this._message.guild?.id; }
    public get channel() { return this._message.channel; }
    public get channelId() { return this._message.channel.id; }
    public get user() { return this._message.author; }
    public get userId() { return this._message.author.id; }
    public get member() { return this._message.member; }
    public get self() { return this._message.guild?.me; }
    public get mentions() { return this._message.mentions; }
    public get attachments() {return this._message.attachments; }

    /**
     * A short cut for message.channel.send();
     * @param content - The content to send.
     * @returns {Message}
     */
    public async send(content: any) {
        return this._message.channel.send(content);
    }
    /**
     * Creates and dms the user.
     * @param content - The content to send
     * @param user - The user to dm
     * @returns {Message}
     */
    public async dm(content: any, user: User) {
        return (await user.createDM()).send(content);
    }
}
