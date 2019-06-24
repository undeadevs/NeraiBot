const Commando = require('discord.js-commando');
const fs = require('fs');
const dotenv = require('dotenv').config();
const bot = new Commando.Client({owner: [process.env.ownerID, process.env.adminID0, process.env.adminID1], commandPrefix: process.env.prefix});

const ytdl = require('ytdl-core');
const yt = require('simple-youtube-api');

const youtube = new yt(process.env.googleapikey);

//clientID 478376842248716291
//inviteLink https://discordapp.com/oauth2/authorize?client_id=478376842248716291&scope=bot&permissions=2146958847

bot.registry.registerDefaultTypes();
bot.registry.registerGroup('fun', 'Fun');
bot.registry.registerGroup('music', 'Music');
bot.registry.registerGroup('math', 'Math');
bot.registry.registerGroup('guild', 'Guild');
bot.registry.registerGroup('analyze', 'Analyze');
bot.registry.registerGroup('search', 'Search');
bot.registry.registerGroup('ppedit', 'Avatar Edit');
bot.registry.registerDefaultGroups();
bot.registry.registerDefaultCommands({ help:false, prefix:false, eval:false, ping:false});
bot.registry.registerCommandsIn(__dirname + '/commands');

bot.on('ready',function(){
    /*console.log("Login Success");

    bot.user.setActivity('Unravel', {type: 'LISTENING'});*/
    console.log(`[Bot is online | Node: ${process.version} | Discord.js-Commando: v${Commando.version}]\nConnected as: ${bot.user.username} (ID: ${bot.user.id})\nGuilds Connected: ${bot.guilds.size}`);
    bot.user.setActivity(`${bot.guilds.size} Servers | ${process.env.prefix}help`, {type: 'WATCHING'});
});

global.queue = {};

bot.msgs = require("./msgs.json");

try {
bot.on('guildMemberAdd', function(member){
    //DYas = member.guilds.find("name", "DYas");
    //tst = member.guilds.find("name", "tst");

    //this is for my server
    if(bot.isOwner(member)){
        let or = member.guild.roles.find("name", "owner");
        let gc = member.guild.channels.find("name", "lobby");
        if(!gc) return;
        if(!or){
            return gc.send(['Welcome to the Server ' + member, rules]);
        }
        member.addRole(or);
        gc.send('Welcome to the Server my owner!!!');
    }else if(!bot.isOwner(member)){
        let mr = member.guild.roles.find("name", "trash");
        let gc = member.guild.channels.find("name", "lobby");
        if(!gc) return;
        if(!mr){
            return gc.send(['Welcome to the Server ' + member]);
        }
        member.addRole(mr);
        let rules = "RULES : \n-do not insult anyone.";
        gc.send(['Welcome to the Server ' + member, rules]);

    }
    //end

    //member.send('Welcome to the Server ' + member);

});
}
catch(error){}

const sc = require("./sc");

bot.on('message', function(message){
    mention = message.mentions.users.first();
    msg = message.content.toLowerCase();
    
    if(message.author.bot) return;

    if(msg == "hello" | msg == "hi" | msg == "hey"){

        message.channel.sendMessage('Hello ' + message.author + ',how are you?');

    }

    if(msg == "dasar wibu" | msg == "wibu lo"){

        message.channel.sendMessage('bodo amat.');

    }

});

bot.login(process.env.token);