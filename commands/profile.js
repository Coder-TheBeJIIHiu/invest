const { VK } = require('vk-io');
let config = require('../config.json');
let utils = require('../utils.js');
let users = require('../base/users.json');
const vk = new VK({ token: config.group_token });

exports.execute = async (message) => {
  let ref = await vk.api.utils.getShortLink({
		url: `https://vk.me/club${config.group}?ref=` + message.user.id
	})

  if(message.user.status == "Вип") day = (message.user.invest / 100 * 3)
  else if(message.user.status == "Премиум") day = (message.user.invest / 100 * 4.5)
  else day = (message.user.invest / 100 * 1.5)

	minute = (day / 1440);
	hour = (minute * 60);

	message.send(`💵 Доход в минуту: ${minute.toFixed(4)}₽
💴 Доход в час: ${hour.toFixed(3)}₽
💶 Доход в сутки: ${day.toFixed(2)}₽

💰 Вы вложили ${await utils.space(message.user.invest)}₽
🔥 Статус: ${message.user.status.replace("Вип", "VIP").replace("Премиум", "PREMIUM")}
🆔 ID: ${message.user.uid}
❗Лимит: ${message.user.limit.toFixed(2)}₽

〽 Ваш реф: ${ref.short_url}
🧸 Вы пригласили: ${message.user.refs.length}`)
}

exports.info = {
	name: [
		"профиль"
	],
	access: false
}
