import {Message, User} from "discord.js";

export class CommandContext {
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


    public async send(content: any) {
        return this._message.channel.send(content);
    }

    public async dm(content: any, user: User) {
        return (await user.createDM()).send(content);
    }
}
