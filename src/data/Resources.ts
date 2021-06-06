import { Collection } from "discord.js";


export const resources = new Collection<string, ResourceData>();
resources.set("discord.js", {
    key: "discord.js",
    lang: "js",
    search: ["d.js"],
    description: "Discord.js is a Discord Library for javascript.",
    resources: [
        {
            title: "Docs",
            description: "These are the docs for discord.js.",
            url: "https://discord.js.org/#/"
        },
        {
            title: "Guides",
            description: "These are guides for discord.js",
            url: "https://discordjs.guide"
        }
    ],
    examples:
        "const Discord = require('discord.js');\n" +
        "\n"+
        "const client = new Discord.Client();\n"+
        "\n"+
        "client.on('ready', () => {\n" +
        "\tconsole.log('Ready');\n" +
        "});\n" +
        "\n" +
        "client.on('message', (message) => {\n" +
        "\tif(message.author.bot) return;\n" +
        "\tswitch(message.content.toLowerCase().trim()) {\n" +
        "\t\tcase '!ping'\n" +
        "\t\t\tmessage.channel.send('Pong!');\n" +
        "\t\tbreak;\n" +
        "\t}\n" +
        "})\n" +
        "\n" +
        "// Place your bot token in instead of 'YOUR_BOT_TOKEN'\n"+
        "client.login('YOUR_BOT_TOKEN');"

});

type ResourceData = {
    key: string;
    search: string[]
    description: string;
    lang: string;
    resources: {
        title: string;
        description: string;
        url: string;
    }[];
    examples: string;
};
