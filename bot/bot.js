require('dotenv').config({path: '../.env'})

const { Telegraf } = require('telegraf');

const token = process.env.REACT_APP_TELEGRAM_BOT_TOKEN
console.log("token:", token)

const bot = new Telegraf(token);
const weblink = "https://unrivaled-gnome-1514e2.netlify.app/"

bot.start((ctx) => {
    console.log("ctx.from:", ctx.from);
    console.log("ctx.chat:", ctx.chat);
    console.log("ctx.message:", ctx.message);
    console.log("ctx.updateSubTypes:", ctx.updateSubTypes);
    ctx.reply('Welcome to gBeano !', {
        reply_markup: {
            keyboard: [[{ text: "JOIN A COMMUNITY", web_app: { url: weblink }}]]
        }
    });
});

bot.launch();