const { VK } = require('vk-io');
let config = require('../config.json');
let utils = require('../utils.js');
let users = require('../base/users.json');
const vk = new VK({ token: config.group_token });

exports.execute = async (message) => {
  message.send(`Выбери топ, который хочешь посмотреть:`, {
    keyboard: JSON.stringify({
      "one_time": true,
      "buttons": [
        [{
          "action": {
            "type": "text",
            "payload": "{\"button\": \"топ_инвесторов\"}",
            "label": `🏅 Топ по инвесторам`
          },
          "color": "secondary"
        }, {
          "action": {
            "type": "text",
            "payload": "{\"button\": \"топ_рефералов\"}",
            "label": `🏅 Топ по рефералам`
          },
          "color": "secondary"
        }],
        [{
          "action": {
            "type": "text",
            "payload": "{\"button\": \"назад\"}",
            "label": `🔙 Меню`
          },
          "color": "negative"
        }]
      ]
    })
  })
}

exports.info = {
	name: [
		"топ"
	],
	access: false
}
