const request = require('request');

const TelegramBot = require('node-telegram-bot-api');

const token = '341606823:AAHRo7IA-7rRVI2B-PuDa4jTSaHrRVVvV6U';

const bot = new TelegramBot(token, { polling: true });

// Start
bot.onText(/\/start/, (msg) => {
	const resp = "Welcome to YDLS Bot!";
	const chatId = msg.chat.id;
	bot.sendMessage(chatId, resp);
});


// Echo
bot.onText(/\/echo (.+)/, (msg, match) => {
	const resp = match[1];
	const chatId = msg.chat.id;
	bot.sendMessage(chatId, resp);
});

// Test
bot.onText(/\/test/, (msg) => {
	const resp = "It's Work!";
	const chatId = msg.chat.id;
	bot.sendMessage(chatId, resp);
});

// ------------------

const url = " https://api.vk.com/method/users.get?user_id=398361402&fields=online&v=5.52&access_token=304662f6304662f6304662f648301d8b2733046304662f66957d3098e38c08bc88ad086";

var status;
var status_msg_id;
var chat_id;

bot.onText(/\/vk/, (msg) => {

	const chatId = msg.chat.id;
	request.post(url, {}, function (erro, response, body) {

		var data = JSON.parse(body).response[0];
		var resp;
		if (data.online == 1) {
			resp = "🍏 Online";
		} else {
			resp = "🍎 Offline"
		}

		bot.sendMessage(chatId, resp);

		status = data.online;
		chat_id = chatId;
		status_msg_id = msg.message_id + 1;

	});

});

setInterval(function () {

	if (status_msg_id != undefined && chat_id != undefined) {

		request.post(url, {}, function (erro, response, body) {

			var data = JSON.parse(body).response[0];

			if (status != data.online) {

				var resp;
				if (data.online == 1) {
					resp = "🍏 Online";
				} else {
					resp = "🍎 Offline"
				}

				const opts = {
					chat_id: chat_id,
					message_id: status_msg_id
				};

				status = data.online;

				bot.editMessageText(resp, opts);

 			}

		});

	}

}, 30000);