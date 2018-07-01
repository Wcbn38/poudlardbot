//recuperer l'ID role discord == \@rolename

const Discord = require('discord.js');
const bot = new Discord.Client();

var ID_channels = []
var x = 0
var hours
var date
var bin
var comm = 0
var id_appelle

const mainChannel = process.env.mainChannel
const mainCategory = process.env.mainCategory
const data = process.env.data
const botId = process.env.botId

var http = require("http");
setInterval(function () {
    http.get("http://wcbn-s-bot.herokuapp.com/");
}, 900000)

setInterval(function () {
    date = new Date()
    hours = date.getHours()
    x = 0
    if (hours === 5 && ID_channels[x] !== []) {
        ID_channels.push(0)
        console.log(`=====START_RESET=====`)
        while (ID_channels[x] !== 0) {
                try {
                    bot.channels.get(ID_channels[x]).delete()
                    console.log(`channel_${x}_ID_${ID_channels[x]}_deleted_at_${date}`)
                }
                catch (error) { }
                x = x + 1
        }
        ID_channels = []
        bot.channels.get(data).setTopic(``)
        console.log(`=====END_RESET=====`)
        bot.channels.get(mainChannel).send(`reset succeful`)
    }
}, 1800000)

bot.on("ready", channels => {
    date = new Date()
    ID_channels = []
    ID_channels.push(bot.channels.get(data).topic)
    bot.channels.get(data).setTopic(`${ID_channels}`)
    console.log(`uptime_${date}`)
})

bot.on("message", message => {
    if (message.content === "new.channel" && message.channel.id === mainChannel && message.user.id !== botId) {
        try {
            message.guild.createChannel(`salon de ${message.member.user.username}`, `voice`)
            comm = 1
            id_appelle = message.member.user.id
        }
        catch (error) { }
    } else { if ( message.user.id !== botId ) {
            try {
                message.delete(10)
                message.channel.send(`message has been deleted. Please send your message in a channel dedicated to this function.`)
            } catch (error) { console.log(error) }
        }}
})

bot.on("channelCreate", channel => {
    if (channel.type === `voice` && comm === 1) {
        ID_channels.push(`${channel.id}`)
        bin = channel.id
        channel.setParent(mainCategory).then(
            channel.overwritePermissions(`${id_appelle}`, {
                CONNECT: true,
                MUTE_MEMBERS: true,
                DEAFEN_MEMBERS: true,
                MOVE_MEMBERS: true,
                VIEW_CHANNEL: true
            }),
            channel.overwritePermissions(`${id_appelle}`, {
                CONNECT: true,
                MUTE_MEMBERS: true,
                DEAFEN_MEMBERS: true,
                MOVE_MEMBERS: true,
                VIEW_CHANNEL: true
            }))
        console.log(`newchannel_${channel.id}_user_${id_appelle}`)
        bot.channels.get(data).setTopic(`${ID_channels}`)
        comm = 0
    }
})


bot.login(process.env.TOKEN);
