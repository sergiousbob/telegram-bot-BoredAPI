require ('dotenv').config ()
const {Telegraf} = require ("telegraf")
const axios = require("axios");


const bot = new Telegraf(process.env.BOT_TOKEN)


bot.on('text', async (ctx) => {

    try {
        ctx.reply (`Hello, ${ctx.message.from.first_name ? ctx.message.from.first_name: 'guest'}!  This telegram bot work with Bored API (http://www.boredapi.com ).The Bored API helps you find things to do when you're bored! There are fields like the number of participants, activity type, and more that help you narrow down your results.`)
        await axios.get ('http://www.boredapi.com/api/activity/').then((res)=>{
            stroka = JSON.stringify(res.data, ['activity']);
            str1= stroka.replace ('{"activity":', '');
            str2= str1.replace(/[^a-zа-яё\s]/gi, '');
             
            return ctx.reply (`You can do this: ${str2}`);
    })
    } catch (e){
        console.error (e)
    }
})

bot.launch ()