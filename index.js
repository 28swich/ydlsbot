const TelegramBot = require('node-telegram-bot-api');

const token = '341606823:AAHRo7IA-7rRVI2B-PuDa4jTSaHrRVVvV6U';

const bot = new TelegramBot(token, {polling: true});

var chatId;

bot.onText(/(.+)/, (msg) =>{
	chatId = msg.chat.id;
})

// Start
bot.onText(/\/start/, (msg) => {
	const resp = "Welcome to YDLS Bot!";
	bot.sendMessage(chatId, resp);
});


// Echo
bot.onText(/\/echo (.+)/, (msg, match) => {
	const resp = match[1];
	bot.sendMessage(chatId, resp);
});

// Test
bot.onText(/\/test/, (msg) => {
	const resp = "It's Work!";
	bot.sendMessage(chatId, resp);
});

// Text file
var fs = require('fs');

bot.onText(/\/todo/, (msg) => {
	fs.readFile('todo.txt', 'utf8', function(err, data){
		if (err) throw err;
		const resp = 'To Do List:\n' + data;
		bot.sendMessage(chatId, resp);
	})
});

