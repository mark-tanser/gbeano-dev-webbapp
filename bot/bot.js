require('dotenv').config()

const { Telegraf } = require('telegraf');

const token = "5180337652:AAGny-dwXp4H9d1RjG2XmfYrEUl6Z0sa--o"

console.log("token:", token)

const bot = new Telegraf(token);
const weblink = "https://unrivaled-gnome-1514e2.netlify.app/"

bot.start((ctx) => {
    console.log("ctx.from:", ctx.from);
    console.log("ctx.chat:", ctx.chat);
    console.log("ctx.message:", ctx.message);
    console.log("ctx.updateSubTypes:", ctx.updateSubTypes);
    ctx.reply('Welcome !', {
        reply_markup: {
            keyboard: [[{ text: "web app", web_app: { url: weblink }}]]
        }
    });
});

bot.launch();