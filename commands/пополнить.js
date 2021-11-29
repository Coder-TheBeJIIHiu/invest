const { VK } = require('vk-io');
let config = require("../config.json");
const vk = new VK({ token: config.group_token });

exports.execute = async (message) => {
  let url = `https://qiwi.com/payment/form/99?extra[%27account%27]=${config.qiwi_number}&amountInteger=1&extra[%27comment%27]=${message.senderId}&blocked[0]=comment&blocked[1]=account`

  let short = (await vk.api.utils.getShortLink({ url })).short_url;

  message.send(`Для пополнения счета осуществите перевод на QIWI-кошелек с указанием комментария.

Qiwi: +${config.qiwi_number} .
Комментарий: ${message.user.id} .

Также можно оплатить по ссылке - ${short} (QIWI)

Платежи без указания комментария или с неверно указанным, не зачисляются.

После пополнения обьязательно нажми на кнопку "проверить пополнение". `, {
    keyboard:JSON.stringify(
        {
          "inline": false,
          "one_time": false,
          "buttons": [
            [{
              "action": {
                "type": "text",
                "payload": "{\"button\": \"проверить\"}",
                "label": "💸 Проверить пополнение"
              },
              "color": "secondary"
            }],
            [{
              "action": {
                "type": "text",
                "payload": "{\"button\": \"назад\"}",
                "label": "Отмена"
              },
              "color": "negative"
            }]
          ]
        })
  })
}

exports.info = {
  name: [
    "пополнить"
  ],
  access: false
}
