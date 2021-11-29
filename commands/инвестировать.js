const { VK } = require('vk-io');
let config = require('../config.json');
let utils = require('../utils.js');
let users = require('../base/users.json');
const vk = new VK({ token: config.group_token });

exports.execute = async (message) => {
  let balance = message.user.balance[0] + message.user.balance[1]
  message.user.stage = "invest"

	message.send(`

 💸 Баланс для инвестиций: ${await utils.space(message.user.balance[1])}₽
 💰 Баланс для вывода: ${await utils.space(message.user.balance[0])}₽

 👉 Введите сумму для инвестирования:`)
}

exports.info = {
	name: [
		"инвестировать"
	],
	access: false
}
