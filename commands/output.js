const { VK } = require('vk-io');
let config = require('../config.json');
let utils = require('../utils.js');
let users = require('../base/users.json');
const vk = new VK({ token: config.group_token });

exports.execute = async (message) => {
	if(message.isChat) return message.send(`Данная команда доступна только в ЛС.`);
	message.user.stage = "send"

  	message.send(`Укажите сумму вывода:`)
}

exports.info = {
	name: [
		"вывод"
	],
	access: false
}
