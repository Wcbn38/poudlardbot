//recuperer l'ID role discord == \@rolename
const Discord = require('discord.js');
const bot = new Discord.Client();
const prefix = "//"

const ID1 = process.env.ID1;
const ID2 = process.env.ID2;
const ID3 = process.env.ID3;
const ID4 = process.env.ID4;
const defaultChannel = process.env.defaultChannel;
const consoleChannel = process.env.consoleChannel;
const infosChannel = process.env.infosChannel;
const mdp = process.env.mdp;
const IDptsname1 = process.env.IDptsname1
const IDptsname2 = process.env.IDptsname2
const IDptsname3 = process.env.IDptsname3
const IDptsname4 = process.env.IDptsname4

const name1 = "Rubis"
const name2 = "Emeraude"
const name3 = "Saphir"
const name4 = "Ambre"

var maison1
var maison2
var messageEvent = ""
var PtsEvent
var PtsMisee = 0
var suivitMaison = 0
var perdant
var suivitEvent = 0

var Pts1 = 0
var Pts2 = 0
var Pts3 = 0
var Pts4 = 0

var aleaMaison;

var http = require("http");
setInterval(function () {
    http.get("http://poudlartbot.herokuapp.com/");
}, 900000);

function getrandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


bot.on('ready', (channels) => {
    Pts1 = parseInt(bot.channels.get(IDptsname1).topic, 10)
    Pts2 = parseInt(bot.channels.get(IDptsname2).topic, 10)
    Pts3 = parseInt(bot.channels.get(IDptsname3).topic, 10)
    Pts4 = parseInt(bot.channels.get(IDptsname4).topic, 10)
    console.log(`Pts1 = ${Pts1} ; Pts2 = ${Pts2} ; Pts3 = ${Pts3} ; Pts4 = ${Pts4} ;`)
})

bot.on('guildMemberAdd', (member, guild) => {
    aleaMaison = getrandom(1, 4);
    console.log(member.user.username);
    if (aleaMaison === 1) {
        console.log(`MemberAdd : ${member.user.username} // ${aleaMaison} // ${name1}`);
        member.addRole(ID1);
        bot.channels.get(defaultChannel).send(`${member.user.username} a rejoint la faction ${name1}`)
        return
    }
    if (aleaMaison === 2) {
        console.log(`MemberAdd : ${member.user.username} // ${aleaMaison} // ${name2}`);
        member.addRole(ID2);
        bot.channels.get(defaultChannel).send(`${member.user.username} a rejoint la faction ${name2}`)
        return
    }
    if (aleaMaison === 3) {
        console.log(`MemberAdd : ${member.user.username} // ${aleaMaison} // ${name3}`);
        member.addRole(ID3);
        bot.channels.get(defaultChannel).send(`${member.user.username} a rejoint la faction ${name3}`)
        return
    }
    if (aleaMaison === 4) {
        console.log(`MemberAdd : ${member.user.username} // ${aleaMaison} // ${name4}`);
        member.addRole(ID4);
        bot.channels.get(defaultChannel).send(`${member.user.username} a rejoint la faction ${name4}`)
        return
    }
});

bot.on('message', (message) => {
    if (message.content === prefix + "help" && message.channel.id === consoleChannel) {
        bot.channels.get(consoleChannel).send(`prefix : ${prefix} \n "startgame" pour lancer une partie \n "annul" pour annuler une partie \n "winner" pour definir le vainqueur \n "event" pour lancer un event \n "eventannul" pour annuler un event \n "eventWinner" pour declarer le gagnant`)
        bot.channels.get(consoleChannel).send(`nom des maisons a rentrer : \n ${name1},${name2},${name3},${name4}`)
        console.log(`Help called : ${message.member.user.id}`)
        return
    }
    if (message.content === prefix + "pts") {
        message.channel.send(`points des maisons : \n ${name1} : ${Pts1} \n ${name2} : ${Pts2} \n ${name3} : ${Pts3} \n ${name4} : ${Pts4}`)
        console.log(`Points total called : ${message.member.user.id}`)
        return
    }
    if ( (message.content === prefix + "reset" + mdp) && (message.channel.id === consoleChannel) ) {
        bot.channels.get(consoleChannel).send("reset successeful")
        Pts1 = 0
        Pts2 = 0
        Pts3 = 0
        Pts4 = 0
        bot.channels.get(IDptsname1).setTopic(Pts1.toString(10))
        bot.channels.get(IDptsname2).setTopic(Pts2.toString(10))
        bot.channels.get(IDptsname3).setTopic(Pts3.toString(10))
        bot.channels.get(IDptsname4).setTopic(Pts4.toString(10))
        message.delete(10)
        console.log(`reset succeful : ${message.member.user.id}`)
        return
    }
    if ( (message.content === prefix + "startseason" + mdp) && (message.channel.id === consoleChannel) ) {
        message.delete(10)

        if ( Pts1 > Pts2 && Pts1 > Pts3 && Pts1 > Pts4 ) {
            message.guild.roles.get(ID1).setPermissions(['SEND_TTS_MESSAGES', 'MANAGE_NICKNAMES'])
            message.guild.roles.get(ID2).setPermissions([])
            message.guild.roles.get(ID3).setPermissions([])
            message.guild.roles.get(ID4).setPermissions([])
            message.guild.roles.get(ID1).setPosition(10)
            bot.channels.get(defaultChannel).send(`saison termine, ${name1} a gangne! \n debut d'une nouvelle saison.`)
            console.log(`Saison termine, ${name1} a gagne, privilege accorde`)
        } 
        else {
        if (Pts2 > Pts4 && Pts2 > Pts3 && Pts2 > Pts4) {
            message.guild.roles.get(ID1).setPermissions([])
            message.guild.roles.get(ID2).setPermissions(['SEND_TTS_MESSAGES', 'MANAGE_NICKNAMES'])
            message.guild.roles.get(ID3).setPermissions([])
            message.guild.roles.get(ID4).setPermissions([])
            message.guild.roles.get(ID2).setPosition(10)
            bot.channels.get(defaultChannel).send(`saison termine, ${name2} a gangne! \n debut d'une nouvelle saison.`)
            console.log(`Saison termine, ${name2} a gagne, privilege accorde`)
        } 
        else {
        if (Pts3 > Pts1 && Pts2 > Pts2 && Pts21 > Pts4) {
            message.guild.roles.get(ID1).setPermissions([])
            message.guild.roles.get(ID2).setPermissions([])
            message.guild.roles.get(ID3).setPermissions(['SEND_TTS_MESSAGES', 'MANAGE_NICKNAMES'])
            message.guild.roles.get(ID4).setPermissions([])
            message.guild.roles.get(ID3).setPosition(10)
            bot.channels.get(defaultChannel).send(`saison termine, ${name3} a gangne! \n debut d'une nouvelle saison.`)
            console.log(`Saison termine, ${name3} a gagne, privilege accorde`)
        } 
        else {
        if ( Pts4 > Pts1 && Pts2 > Pts2 && Pts2 > Pts3 ) {
            message.guild.roles.get(ID1).setPermissions([])
            message.guild.roles.get(ID2).setPermissions([])
            message.guild.roles.get(ID3).setPermissions([])
            message.guild.roles.get(ID4).setPermissions(['SEND_TTS_MESSAGES', 'MANAGE_NICKNAMES'])
            message.guild.roles.get(ID4).setPosition(10)
            bot.channels.get(defaultChannel).send(`saison termine, ${name4} a gangné! \n debut d'une nouvelle saison.`)
            console.log(`Saison termine, ${name4} a gagne, privilege accorde`)
        }
        else {
            message.guild.roles.get(ID1).setPermissions([])
            message.guild.roles.get(ID2).setPermissions([])
            message.guild.roles.get(ID3).setPermissions([])
            message.guild.roles.get(ID4).setPermissions([])
            bot.channels.get(defaultChannel).send(`Saison termine, pas de gagnant cette fois! \n debut d'une nouvelle saison.`)
            console.log(`Saison terminé, aucun gagnant, tout les privileges sont annulé.`)
        }
        }
        }
        }
        console.log(`Debut d'une nouvelle saison...`)
        Pts1 = 0
        Pts2 = 0
        Pts3 = 0
        Pts4 = 0
        bot.channels.get(IDptsname1).setTopic(Pts1.toString(10))
        bot.channels.get(IDptsname2).setTopic(Pts2.toString(10))
        bot.channels.get(IDptsname3).setTopic(Pts3.toString(10))
        bot.channels.get(IDptsname4).setTopic(Pts4.toString(10))
        console.log(`Saison commencé : ${message.member.user.id}`)
        return
    }
    if (message.channel.id === consoleChannel && message.content !== "faction 1 :" && message.content !== "defi lance : ne pas lancer de nouveaux defi avant le message de fin!" && message.content !== "error : unknown. Var `suivitMaison` crashed. Reebooting... " && message.content !== "faction 2 :" && message.content !== "mise :") {
        if (message.content === prefix + "startgame" && suivitMaison === 0) {
            bot.channels.get(consoleChannel).send("faction 1 :")
            suivitMaison = 1
            console.log(`defie lance : ${message.member.user.id}`)
            return
        }
        if (message.content === prefix + "annul") {
            bot.channels.get(consoleChannel).send("defi annule")
            suivitMaison = 0
            PtsMisee = 0
            console.log(`defi annule : ${message.member.user.id}`)
            return
        } else {
            if (message.content === prefix + "winner" && suivitMaison === 4) {
                bot.channels.get(consoleChannel).send("gagnant :")
                console.log(`Declaration gagnant : ${message.member.user.id}`)
                suivitMaison = suivitMaison + 1
                return
            }
            if ((message.content === maison1 || message.content === maison2) && suivitMaison === 5) {
                bot.channels.get(defaultChannel).send(`@everyone ${message.content} a gagne`)
                bot.channels.get(consoleChannel).send(`validation termine!`)
                console.log(`Gagnant : ${message.content} : ${message.member.user.id}`)
                if (message.content === maison1) {
                    perdant = maison2
                } else {
                    if (message.content === maison2) {
                        perdant = maison1
                    }
                }
                if (message.content === name1) {
                    Pts1 = Pts1 + PtsMisee
                }
                if (message.content === name2) {
                    Pts2 = Pts2 + PtsMisee
                }
                if (message.content === name3) {
                    Pts3 = Pts3 + PtsMisee
                }
                if (message.content === name4) {
                    Pts4 = Pts4 + PtsMisee
                }
            }
            if ((message.content === name1 || message.content === name2 || message.content === name3 || message.content === name4 || suivitMaison === 3) && suivitMaison < 4) {
                if (suivitMaison === 1) {
                    maison1 = message.content
                    bot.channels.get(consoleChannel).send("faction 2 :")
                    suivitMaison = suivitMaison + 1
                    return
                }
                if (suivitMaison === 2) {
                    maison2 = message.content
                    bot.channels.get(consoleChannel).send("mise :")
                    suivitMaison = suivitMaison + 1
                    return
                }
                if (suivitMaison === 3) {
                    PtsMisee = parseInt(message.content, 10)
                    bot.channels.get(consoleChannel).send("defi lance : ne pas lancer de nouveaux defi avant le message de fin!")
                    bot.channels.get(defaultChannel).send(`Une game entre ${maison1} et ${maison2} a commence pour ${PtsMisee} points. Bonne chance a eux!`)
                    suivitMaison = suivitMaison + 1
                    console.log(`parametres du defi termine`)
                    return
                }
                if (suivitMaison > 5) {
                    bot.channels.get(consoleChannel).send("error : unknown. Var `suivitMaison` crashed. Reebooting var... ")
                    suivitMaison = 0
                    return
                }
            }
            if (perdant === name1) {
                Pts1 = Pts1 - PtsMisee
                PtsMisee = 0
                perdant = ""
                suivitMaison = 0
                return
            }
            if (perdant === name2) {
                Pts2 = Pts2 - PtsMisee
                PtsMisee = 0
                perdant = ""
                suivitMaison = 0
                return
            }
            if (perdant === name3) {
                Pts3 = Pts3 - PtsMisee
                PtsMisee = 0
                perdant = ""
                suivitMaison = 0
                return
            }
            if (perdant === name4) {
                Pts4 = Pts4 - PtsMisee
                PtsMisee = 0
                perdant = ""
                suivitMaison = 0
                return
            }


            if (message.channel.id === consoleChannel && message.content === `${prefix}event` && suivitEvent === 0) {
                bot.channels.get(consoleChannel).send(`votre message :`)
                suivitEvent = 20
                console.log(`Event : ${message.member.user.id}`)
                return
            }
            if (suivitEvent === 20 && message.channel.id === consoleChannel && message.content !== "votre message :") {
                messageEvent = message.content
                bot.channels.get(consoleChannel).send(`votre mise par maison`)
                suivitEvent = 21
                return
            }
            if (suivitEvent === 21 && message.channel.id === consoleChannel && message.content !== `votre mise par maison`) {
                PtsEvent = parseInt(message.content, 10)
                bot.channels.get(consoleChannel).send(`Event reussi. Merci de ne pas lancer d'event.`)
                bot.channels.get(infosChannel).send(`@everyone , nouvel event : ${messageEvent}. \n récompense : ${PtsEvent * 3}`)
                suivitEvent = 22
                console.log(`Parametre event termine`)
                return
            }
            if (suivitEvent === 22 && message.channel.id === consoleChannel && message.content === `${prefix}eventWinner` && message.content !== "Event reussi. Merci de ne pas lancer d'event.") {
                bot.channels.get(consoleChannel).send(`winner :`)
                suivitEvent = 23
                console.log(`declaration event winner : ${message.member.user.id}`)
                return
            }
            if (suivitEvent === 23 && message.channel.id === consoleChannel && (message.content === name1 || message.content === name2 || message.content === name3 || message.content === name4)) {
                if (message.content === name1) {
                    Pts1 = Pts1 + PtsEvent * 3
                    Pts2 = Pts2 - PtsEvent
                    Pts3 = Pts3 - PtsEvent
                    Pts4 = Pts4 - PtsEvent
                }
                if (message.content === name2) {
                    Pts2 = Pts2 + PtsEvent * 3
                    Pts1 = Pts1 - PtsEvent
                    Pts3 = Pts3 - PtsEvent
                    Pts4 = Pts4 - PtsEvent
                }
                if (message.content === name3) {
                    Pts3 = Pts3 + PtsEvent * 3
                    Pts2 = Pts2 - PtsEvent
                    Pts1 = Pts1 - PtsEvent
                    Pts4 = Pts4 - PtsEvent
                }
                if (message.content === name4) {
                    Pts4 = Pts4 + PtsEvent * 3
                    Pts2 = Pts2 - PtsEvent
                    Pts3 = Pts3 - PtsEvent
                    Pts1 = Pts1 - PtsEvent
                }
                bot.channels.get(defaultChannel).send(`${message.content} a gagne`)
                bot.channels.get(consoleChannel).send(`event terminé, points distribué.`)
                PtsEvent = 0
                messageEvent = ""
                suivitEvent = 0
                bot.channels.get(IDptsname1).setTopic(Pts1.toString(10))
                bot.channels.get(IDptsname2).setTopic(Pts2.toString(10))
                bot.channels.get(IDptsname3).setTopic(Pts3.toString(10))
                bot.channels.get(IDptsname4).setTopic(Pts4.toString(10))
                console.log(`pts event distribué`)
                return
            }
            if (message.channel.id === consoleChannel && message.content === `${prefix}eventannul`) {
                bot.channels.get(consoleChannel).send(`event annule`)
                messageEvent = ""
                suivitEvent = 0
                PtsEvent = 0
                console.log(`event annule : ${message.member.user.id}`)
            }
        }
    }
    if (message.content === `validation termine!` && message.channel.id === consoleChannel) {
        bot.channels.get(IDptsname1).setTopic(Pts1.toString(10))
        bot.channels.get(IDptsname2).setTopic(Pts2.toString(10))
        bot.channels.get(IDptsname3).setTopic(Pts3.toString(10))
        bot.channels.get(IDptsname4).setTopic(Pts4.toString(10))
    }
});

bot.login(process.env.TOKEN);

//# sourceMappingURL=app.js.map
