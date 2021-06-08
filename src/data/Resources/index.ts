import { Collection } from "discord.js";
import fs from 'fs';

function getResource(name: string): string {
    return fs.readFileSync('src/data/Resources/' + name).toString();
}

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
    examples: getResource('discordJs.js')
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
