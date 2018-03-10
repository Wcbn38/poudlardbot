//recuperer l'ID role discord == \@rolename
const Discord = require('discord.js');
const bot = new Discord.Client();
const tagueule = "on s'en fout";
const Gryffondor = 1;
const Poufsouffle = 2;
const Serpentard = 3;
const Serdaigle = 4;
const prefix = "//"

const IDGryffondor = process.env.IDGryffondor;
const IDPoufsouffle = process.env.IDPoufsouffle;
const IDSerpentard = process.env.IDSerpentard;
const IDSerdaigle = process.env.IDSerdaigle;
const defaultChannel = process.env.defaultChannel;
const consoleChannel = process.env.consoleChannel;
const ban = process.env.ban;
const mdp = process.env.mdp;

const nameGryffondor = "Gryffondor"
const namePoufsouffle = "Poufsouffle"
const nameSerpentard = "Serpentard"
const nameSerdaigle = "Serdaigle"

var maison1
var maison2
var PtsMisee = 0
var suivitMaison = 0
var perdant


var PtsGryffondor = 0
var PtsPoufsouffle = 0
var PtsSerpentard = 0
var PtsSerdaigle = 0

var aleaMaison;

var http = require("http");
setInterval(function() {
    http.get("https://poudlartbot.herokuapp.com/");
}, 900000);

function getrandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


bot.on('guildMemberAdd', (member, guild) => {
    aleaMaison = getrandom(1, 4);
    console.log(member.user.username);
    if (aleaMaison === 1) {
        console.log(aleaMaison + "/ maison: Gryffondor");
        member.addRole(IDGryffondor);
        bot.channels.get(defaultChannel).send(`${member.user.username} a rejoint Gryffondor`)
    }
    if (aleaMaison === 2) {
        console.log(aleaMaison + "/ maison: Poufsouffle");
        member.addRole(IDPoufsouffle);
        bot.channels.get(defaultChannel).send(`${member.user.username} a rejoint Poufsouffle`)
    }
    if (aleaMaison === 3) {
        console.log(aleaMaison + "/ maison: Serpentard");
        member.addRole(IDSerpentard);
        bot.channels.get(defaultChannel).send(`${member.user.username} a rejoint Serpentard`)
    }
    if (aleaMaison === 4) {
        console.log(aleaMaison + "/ maison: Serdaigle");
        member.addRole(IDSerdaigle);
        bot.channels.get(defaultChannel).send(`${member.user.username} a rejoint Serdaigle`)
    }
});

bot.on('message', (message) => {
    if (message.user.id !== ban) {
    if (message.content === prefix + "help" && message.channel.id === consoleChannel) {
        bot.channels.get(consoleChannel).send(`prefix : ${prefix} \n "startgame" pour lancer une partie \n "annul" pour annuler une partie \n "winner" pour definir le vainqueur`)
        bot.channels.get(consoleChannel).send(`nom des maisons a rentrer : \n ${nameGryffondor},${namePoufsouffle},${nameSerdaigle},${nameSerpentard}`)
    }
    if (message.content === prefix + "pts") {
        message.channel.send(`points des maisons : \n ${nameGryffondor} : ${PtsGryffondor} \n ${namePoufsouffle} : ${PtsPoufsouffle} \n ${nameSerdaigle} : ${PtsSerdaigle} \n ${nameSerpentard} : ${PtsSerpentard}`)
    }
    if (message.content === prefix + "reset" + mdp ) {
    bot.channels.get(consoleChannel).send("reset successeful")
    PtsGryffondor = 0
    PtsPoufsouffle = 0
    PtsSerpentard = 0
    PtsSerdaigle = 0
    message.delete(10)
    }
    if (message.channel.id === consoleChannel && message.content !== "maison 1 :" && message.content !== "defi lance : ne pas lancer de nouveaux defi avant le message de fin!" && message.content !== "error : unknown. Var `suivitMaison` crashed. Reebooting... " && message.content !== "maison 2 :" && message.content !== "mise :") {
        if (message.content === prefix + "startgame" && suivitMaison === 0) {
            console.log("defie lance")
            bot.channels.get(consoleChannel).send("maison 1 :")
            return
        }
        if (message.content === prefix + "annul") {
            bot.channels.get(consoleChannel).send("defi annule")
            suivitMaison = 0
            return
        } else {
            if (message.content === prefix + "winner" && suivitMaison >=4) {
                bot.channels.get(consoleChannel).send("gagnant :")
                console.log("declaration gagnant")
                suivitMaison = suivitMaison + 1
                return
            }
            if ((message.content === maison1 || message.content === maison2) && suivitMaison === 5) {
                bot.channels.get(defaultChannel).send(`${message.content} a gagne`)
                if (message.content === maison1) {
                    perdant = maison2
                } else {
                    if (message.content === maison2) {
                        perdant = maison1
                }
            }
                if (message.content === nameGryffondor) {
                    PtsGryffondor = PtsGryffondor + PtsMisee
                }
                if (message.content === namePoufsouffle) {
                    PtsPoufsouffle = PtsPoufsouffle + PtsMisee
                }
                if (message.content === nameSerdaigle) {
                    PtsSerdaigle = PtsSerdaigle + PtsMisee
                }
                if (message.content === nameSerpentard) {
                    PtsSerpentard = PtsSerpentard + PtsMisee
                }
            }
            if ((message.content === nameGryffondor || message.content === namePoufsouffle || message.content === nameSerdaigle || message.content === nameSerpentard || suivitMaison === 2) && suivitMaison < 4) {
                suivitMaison = suivitMaison + 1
                if (suivitMaison === 1) {
                    maison1 = message.content
                    bot.channels.get(consoleChannel).send("maison 2 :")
                    return
                }
                if (suivitMaison === 2) {
                    maison2 = message.content
                    bot.channels.get(consoleChannel).send("mise :")
                    return
                }
                if (suivitMaison === 3) {
                    PtsMisee = parseInt(message.content, 10)
                    bot.channels.get(consoleChannel).send("defi lance : ne pas lancer de nouveaux defi avant le message de fin!")
                    bot.channels.get(defaultChannel).send(`une game entre ${maison1} et ${maison2} a commence pour ${PtsMisee} points`)
                    suivitMaison = suivitMaison + 1
                    return
                }
                if (suivitMaison > 5) {
                    bot.channels.get(consoleChannel).send("error : unknown. Var `suivitMaison` crashed. Reebooting var... ")
                    suivitMaison = 0
                    return
                }
            }
            if (perdant === nameGryffondor) {
                PtsGryffondor = PtsGryffondor - PtsMisee
                PtsMisee = 0
                perdant = ""
                suivitMaison = 0
                return
            }
            if (perdant === namePoufsouffle) {
                PtsPoufsouffle = PtsPoufsouffle - PtsMisee
                PtsMisee = 0
                perdant = ""
                suivitMaison = 0
                return
            }
            if (perdant === nameSerdaigle) {
                PtsSerdaigle = PtsSerdaigle - PtsMisee
                PtsMisee = 0
                perdant = ""
                suivitMaison = 0
                return
            }
            if (perdant === nameSerpentard) {
                PtsSerpentard = PtsSerpentard - PtsMisee
                PtsMisee = 0
                perdant = ""
                suivitMaison = 0
                return
            }
        }
        }
    }
});

bot.login(process.env.TOKEN);

//# sourceMappingURL=app.js.map
