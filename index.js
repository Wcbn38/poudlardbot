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

var http = require("http");
setInterval(function () {
http.get("http://wcbn-s-bot.herokuapp.com/");
},9000)

setInterval(function () {
    date = new Date()
    hours = date.getHours()
    if (hours === 3) {
        ID_channels.push(`0`)
        x = 0
        console.log(`=====START_RESET=====`)
        while (ID_channels[x] !== 0) {
            try {
                bot.channels.get(ID_channels[x]).delete()
                console.log(`channel_${x}_ID_${ID_channels[x]}_deleted_at_${date}`)
            }
            catch (error) { }
            x = x + 1
        }
        console.log(`=====END_RESET=====`)
    }
}, 180000)

bot.on("ready", channels => {
    date = new Date()
    bot.channels.get(mainChannel).send(`bot is now ON, uptime : [ ${date} ]`)
    console.log(`uptime_${date}`)
})

bot.on("message", message => {
    if (message.content === "new.channel" && message.channel.id === mainChannel ) {
        try {
            message.guild.createChannel(`salon de ${message.member.user.username}`, `voice`)
            id_appelle = message.member.user.id
            comm = 1
        }
        catch (error) { }
    }
})

bot.on("channelCreate", channel => {
    if (channel.type === `voice` && comm === 1) {
            ID_channels.push(`${channel.id}`)
            bin = channel.id
            channel.setParent(mainCategory).then(
            channel.overwritePermissions(id_appelle, {
                CONNECT: true,
                MUTE_MEMBERS: true,
                DEAFEN_MEMBERS: true,
                MOVE_MEMBERS: true
            }).catch(console.error))
            console.log(`newchannel_${channel.id}_user_${id_appelle}`)
        comm = 0
    }
})


bot.login(process.env.TOKEN);
