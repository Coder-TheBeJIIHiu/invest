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
            "label": `Топ инвесторов`
          },
          "color": "secondary"
        }, {
          "action": {
            "type": "text",
            "payload": "{\"button\": \"топ_рефералов\"}",
            "label": `Топ рефералов`
          },
          "color": "secondary"
        }],
        [{
          "action": {
            "type": "text",
            "payload": "{\"button\": \"назад\"}",
            "label": `Назад`
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
