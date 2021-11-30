const { VK } = require('vk-io');
const Qiwi = require('node-qiwi-api').Qiwi;
let config = require('../config.json');
let utils = require('../utils.js');
let users = require('../base/users.json');
const vk = new VK({ token: config.group_token });
const Wallet = new Qiwi(config.qiwi_token);

exports.execute = async (message, menu) => {
  Wallet.getOperationHistory({
		rows: 10,
		operation: "IN"
	}, (err, operations) => {

		if(Number(operations.data[0].comment) !== message.user.id || Number(operations.data[0].txnId) === message.user.rubdate) return message.send(`Нет входящих пополнений`, {keyboard: menu})

		rubles = operations.data[0].sum.amount

		message.user.balance[1] += Number(rubles);
		message.user.rubdate = operations.data[0].txnId;

		message.send(`Вам зачисленно ${rubles} рублей.`, {keyboard: menu})
	})
}

exports.info = {
	name: [
		"проверить"
	],
	access: false
}
