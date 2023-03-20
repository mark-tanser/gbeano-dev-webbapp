require('dotenv').config()

const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
const weblink = "https://unrivaled-gnome-1514e2.netlify.app/"

bot.start((ctx) => {
    console.log("ctx.from:", ctx.from);
    console.log("ctx.chat:", ctx.chat);
    console.log("ctx.message:", ctx.message);
    console.log("ctx.updateSubTypes:", ctx.updateSubTypes);
    ctx.reply('Welcome to gBeano !', {
        reply_markup: {
            keyboard: [[{ text: "web app", web_app: { url: weblink }}]]
        }
    });
});

bot.launch();