const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('Ready');
});
client.on('message', (message) => {
    if(message.author.bot) return;

    switch(message.content.toLowerCase().trim()) {
        case '!ping':
            message.channel.send('Pong!');
            break;
    }
});

// Place your bot token in instead of 'YOUR_BOT_TOKEN'
client.login('YOUR_BOT_TOKEN');