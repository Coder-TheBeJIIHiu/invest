const { VK } = require('vk-io');
let config = require('../config.json');
let utils = require('../utils.js');
let users = require('../base/users.json');
const vk = new VK({ token: config.group_token });

exports.execute = async (message) => {
  let ref = await vk.api.utils.getShortLink({
		url: `https://vk.me/club${config.group}?ref=` + message.user.id
	})

  if(message.user.status == "Вип") day = (message.user.invest / 100 * 18)
  else if(message.user.status == "Премиум") day = (message.user.invest / 100 * 25)
  else day = (message.user.invest / 100 * 15)

	minute = (day / 1440);
	hour = (minute * 60);

	message.send(`🙈 Доход в сутки: ${day.toFixed(2)}₽

⚙ Ваш ID: ${message.user.uid} 
💸 Вложено : ${await utils.space(message.user.invest)}₽ 
💰 Баланс для вывода: ${await utils.space(message.user.balance[0])}₽ 
🥝 Номер QIWI - ${message.user.number}

🗣️ Реферальная ссылка -  ${ref.short_url}`)
}

exports.info = {
	name: [
		"профиль"
	],
	access: false
}
