const commando = require('discord.js-commando');
const discord = require('discord.js');
var sTwitter = require('scrape-twitter');
const formatNumbers = require(`../../formatNumbers`);

class twitterCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'twitter',
            group: 'search',
            memberName: 'twitter',
            description: 'Shows someone twitter info.',
            args: [
                {
                    key: 'user',
                    prompt:'Please provide a valid twitter username.',
                    type: 'string'
                }
            ]
        });
    }

    async run(message, { user })
    {
        if(1==1) return message.say(`Unfortunately this command is no longer working.`);
        async function a() {
            try{
            var userInfo = await sTwitter.getUserProfile(user);
        
            var uInfo = {
                sn: userInfo.screenName,
                n: userInfo.name,
                pfp: userInfo.profileImage,
                bio: userInfo.bio,
                join: userInfo.joinDate,
                followers: userInfo.followerCount,
                following: userInfo.followingCount,
                tweets: userInfo.tweetCount
            }
        
            console.log(uInfo);
            if(!uInfo.bio || String(uInfo.bio)==``){
                var twtEmbed = new discord.RichEmbed()
                .setTitle(`Info for: ${uInfo.sn}`)
                .setImage(uInfo.pfp)
                .addField(`Name:`, uInfo.n,false)
                .addField(`Followers:`, `${formatNumbers(uInfo.followers, 0, `.`, `,`)}`,false)
                .addField(`Following:`, `${formatNumbers(uInfo.following, 0, `.`, `,`)}`,false)
                .addField(`Tweets:`, uInfo.tweets,false)
                .setColor("#cc0000")
                .setFooter(`Requested by: ${message.author.username}`, message.author.avatarURL);
            }else{
            var twtEmbed = new discord.RichEmbed()
                .setTitle(`Info for: ${uInfo.sn}`)
                .setImage(uInfo.pfp)
                .addField(`Name:`, uInfo.n,false)
                .addField(`Followers:`, `${formatNumbers(uInfo.followers, 0, `.`, `,`)}`,false)
                .addField(`Following:`, `${formatNumbers(uInfo.following, 0, `.`, `,`)}`,false)
                .addField(`Tweets:`, `${formatNumbers(uInfo.tweets, 0, `.`, `,`)}`,false)
                .addField(`Bio:`, uInfo.bio,false)
                .setColor("#cc0000")
                .setFooter(`Requested by: ${message.author.username}`, message.author.avatarURL);
            }
            message.say(twtEmbed)

            }
            catch(error){
                message.say(`Err: ${error}`);
            }
        
        }
        a();
    }

}

module.exports = twitterCommand;