const { VK } = require('vk-io');
let config = require('../config.json');
let utils = require('../utils.js');
let users = require('../base/users.json');
const vk = new VK({ token: config.group_token });

exports.execute = async (message, menu) => {
	message.send(`Меню:`, {keyboard: menu})
}

exports.info = {
	name: [
		"назад",
		"меню"
	],
	access: false
}
