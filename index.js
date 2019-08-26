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
const consoleChannel = process.env.console
const data = process.env.data
const botId = process.env.botId
var StartMessage = `build v1.1.1 :: uptime_${date}`

var http = require("http");
setInterval(function () {
    http.get("http://wcbn-s-bot.herokuapp.com/");
}, 900000)

setInterval(function () {
    date = new Date()
    hours = date.getHours()
    x = 0
    if (hours === 7 && !( ID_channels === [] || ID_channels === [1] ) ) {
        ID_channels.push(0)
        console.log(`=====START_RESET=====`)
        bot.channels.get(consoleChannel).send(`=====START_RESET=====`)
        while (ID_channels[x] !== 0) {
                try {
                    if (ID_channels[x] !== 1) {
                    bot.channels.get(ID_channels[x]).delete()
                    bot.channels.get(consoleChannel).send(`channel_${x}_ID_${ID_channels[x]}_deleted_at_${date}`)
                    console.log(`channel_${x}_ID_${ID_channels[x]}_deleted_at_${date}`)
                    }
                }
                catch (error) { console.log(error)
                                bot.channels.get(consoleChannel).send(`delete_failed_channel==${ID_channels[x]}`)
                              }
                x = x + 1
        }
        ID_channels = [1]
        bot.channels.get(data).setTopic(`1`)
        bot.channels.get(consoleChannel).send(`=====END_RESET=====`)
        console.log(`=====END_RESET=====`)
    }
}, 3600000)

bot.on("ready", channels => {
    date = new Date()
    ID_channels = []
    ID_channels.push(bot.channels.get(data).topic)
    bot.channels.get(data).setTopic(`${ID_channels}`)
    bot.channels.get(consoleChannel).send(StartMessage)
    console.log(StartMessage)
})

bot.on("message", message => {
    if (message.content === "new.channel" && message.channel.id === mainChannel && message.member.user.id !== botId) {
        try {
            message.guild.createChannel(`salon de ${message.member.user.username}`, `voice`)
            comm = 1
            id_appelle = message.member.user.id
        }
        catch (error) { }
    } else { if ( message.member.user.id !== botId && message.channel.id === mainChannel) {
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
            })).then(
            channel.overwritePermissions(channel.guild.defaultRole, {
                CONNECT: false,
                MUTE_MEMBERS: false,
                DEAFEN_MEMBERS: false,
                MOVE_MEMBERS: true,
                VIEW_CHANNEL: false
            }),
            channel.overwritePermissions(channel.guild.defaultRole, {
                CONNECT: false,
                MUTE_MEMBERS: false,
                DEAFEN_MEMBERS: false,
                MOVE_MEMBERS: true,
                VIEW_CHANNEL: false
            }))
        bot.channels.get(consoleChannel).send(`newchannel_${channel.id} user_${id_appelle}`)
        console.log(`newchannel_${channel.id} user_${id_appelle}`)
        bot.channels.get(data).setTopic(`${ID_channels}`)
        comm = 0
    }
})


bot.login(process.env.TOKEN);
