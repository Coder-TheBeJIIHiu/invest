const { VK } = require('vk-io');
let config = require("../config.json");
const vk = new VK({ token: config.group_token });

exports.execute = async (message) => {
  let url = `https://qiwi.com/payment/form/99?extra[%27account%27]=${config.qiwi_number}&amountInteger=1&extra[%27comment%27]=${message.senderId}&blocked[0]=comment&blocked[1]=account`

  let short = (await vk.api.utils.getShortLink({ url })).short_url;

  message.send(`1 вариант:
  💰 Чтобы пополнить баланс, отправьте нужную вам сумму по этой ссылке ${short} (QIWI)
  
  2 вариант:
  💰 Чтобы пополнить баланс, отправьте нужную вам сумму по этому номеру +${config.qiwi_number} (QIWI)
❗ Внимание, в комментарии к переводу обязательно укажите ваш ID [ВОТ ЭТОТ: ${message.user.id}], иначе бот не увидет ваш платеж.
😐 Если вы по какой-то причине не укажите свой ID в комменитариях или укажите не те данные, админам писать смысла нет, они ничего вам НЕ ВЕРНУТ!
  
👆 После пополнения нажмите на кнопку «Проверить пополнение»`, {
    keyboard:JSON.stringify(
        {
          "inline": true,
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
