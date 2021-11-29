
const { VK } = require('vk-io');
const Qiwi = require('node-qiwi-api').Qiwi;
const dateTime = require('node-datetime');
const fs = require('fs');
let config = require('./config.json'); // Подключаем конфиг
let utils = require('./utils.js'); // Подключаем утилиты
let users = require('./base/users.json'); // Подключаем базу данных
let promos = require('./base/promos.json')
let sends = require('./base/sends.json')
const request = require("request")
const express = require("express");
const app = express();
app.get('/', function (req, res) {
  res.send('H'
})
app.listen(3000||process.env.PORT)
const vk = new VK({
   token: config.group_token
});

const Wallet = new Qiwi(config.qiwi_token);

const commands = []; // Массив с командами

// Добавление команд в массив
fs.readdir("./commands/", function(err, files) {
   files.forEach(f => {
       commands.push(require(`./commands/${f}`));
   });
});

setInterval(() => {
   utils.save(users, 'users')
   var url = "http://investvkbot5.herokuapp.com"
   request(url, (error, response, body) => {
console.log(response)
})
}, 100000)

// Инвестирование каждые 10 минут
setInterval(() => {
    users.map(invest => {
      if(invest.status == "Вип") day = (invest.invest / 100 * 18)
      else if(invest.status == "Премиум") day = (invest.invest / 100 * 25)
      else day = (invest.invest / 100 * 15)

      minute = (day / 1440 * 10).toFixed(3)

      invest.balance[0] += Number(minute)
    })
}, 600000);
// Убавление бонуса
setInterval(() => {
  users.filter(user => user.bonus > 0).map(user => {
    user.bonus -= 1
  })
}, 1 * 1000)

// Событие нового сообщения
vk.updates.on("message_new", async (message) => {
   if (!message.text || message.chatId == 0) return

   if (message.messagePayload && message.text != "Начать") message.text = message.messagePayload.button;

   message.args = message.text.split(" ");
   app.get('/', function (req, res) {
     res.send(message) 
    });
   if (!users.find(x => x.id === message.senderId)) {
       const [user_info] = await vk.api.users.get({
           user_id: message.senderId
       });

       users.push({
           id: message.senderId,
           uid: users.length,
           name: user_info.first_name,
           balance: [0, 0, 0],
           status: "Игрок",
           stage: "",
           bonus: 0,
           invest: 0,
           refs: [],
           ban: false,
           limit: 500000000000000000
       })

       message.send(config.start_msg, {keyboard: menu})
       utils.save(users, 'users')
   }

   message.user = users.find(x => x.id === message.senderId);

   if (message.payload.message.ref) {
      console.log(users.find(x => x.refs.find(ref => ref.id == message.senderId)))
       if(!users.find(x => x.refs.find(ref => ref.id == message.senderId))) {
           let ref = users.find(x => x.id == Number(message.payload.message.ref))
           if (ref.id != message.senderId) {
               message.send(`🗣️ ${ref.name}, по вашей ссылке перешёл пользователь [id${message.user.id}|${message.user.name}], на баланс для инвестиций зачислено 5 ₽`, {
                  user_id: ref.id
               }
             )

            ref.refs.push({
              id: message.senderId
            })

            ref.balance[1] += 5
            message.user.balance[1] += 3

            message.send(`💰 Вы перешли по реферальной ссылке пользователя, на баланс для инвестиций зачислено 3 ₽`)


           }
       }
   }

  

   if(promos.find(x => x.name.toLowerCase() == message.text.toLowerCase())) {
       let promocode = promos.find(x => x.name.toLowerCase() == message.text.toLowerCase());

       if(promocode.users.length >= promocode.activations) return message.send(` У данного промокода закончились активации`);
       if(promocode.users.find(x => x == message.user.id)) return message.send(` Вы уже активировали данный промокод`);

       message.user.balance[1] += promocode.give; // Выдаём монеты за активацию промокода
       promocode.users.push(message.user.id); // Добавляем пользователя в массив активированных промокодов, дабы он не активировал второй раз

       message.send(`💰 Вы активировали промокод. На ваш баланс зачислено ${promocode.give}₽\n• ${promocode.activations-promocode.users.length > 0 ? `Активаций: ${promocode.activations-promocode.users.length}` : `Активации закончились.`}`);

       require('fs').writeFileSync('./base/promos.json', JSON.stringify(promos, null, '\t'));
   }

   commands.forEach(async (command) => {
       if (command.info.name.indexOf(message.args[0].toLowerCase()) != -1) {
           if (command.info.access) {
               if(config.owners.indexOf(message.senderId) == -1) return;
           }
           message.user.stage = ""

           return await command.execute(message, menu, utils, vk);
       }
   });

   if(message.user.stage == "send") {
       if(!Number(message.text)) return;

       if(message.text > message.user.limit) return message.send(`Нельзя вывести сумму, которая больше вашего лимита (${message.user.limit}₽)`)

       if(message.text < 1) return message.send(`Вывод доступен от 1 ₽`);

       if(!message.user.number) return message.send(`У вас не установлен QIWI номер.\n Чтобы установить нужно написать "номер +79041326823".`);
       if(message.user.balance[0] < message.text) return message.send(`Недостаточно средств для вывода.`);
       message.user.stage = ""
       message.user.balance[0] -= message.text;
       message.user.limit -= message.text;

       message.send(`Заявка на вывод успешно создана.`);

       sends.push({
           id: sends.length + 1,
           userId: message.senderId,
           userNumber: 0,
           count: Number(message.text),
           messageId: message.id
       });

       await utils.save(sends, "sends")

       let msg = await vk.api.messages.send({ random_id: 0, message: `💸 Новый запрос №${sends.length} на вывод ${message.text}₽`, forward_messages: message.id, user_id: 580198836, keyboard: JSON.stringify({
        "inline": true,
        "buttons": [
          [{
            "action": {
              "type": "text",
              "payload": `{\"button\": \"отправить ${sends.length}\"}`,
              "label": `Оплатить`
            },
            "color": "secondary"
          }]
        ]
       })
   })
   }

   if(message.user.stage == "invest") {
     if(!Number(message.text)) return;

     console.log(message.text)
     message.text = Number(Number(message.text).toFixed(2));

     if(message.text < 1) return message.send(`Инвестировать можно от 1 ₽`);

     let all_balance = message.user.balance[1] + message.user.balance[0]
     let invest = Number(message.text)

     if(all_balance < message.text) return message.send(`На твоём балансе недостаточно ₽`)
      if(invest >= message.user.balance[1]) {
        invest = invest - message.user.balance[1];
        message.user.balance[1] = 0;
      }

      if(invest < message.user.balance[1]) {
        message.user.balance[1] -= invest;
        invest = 0;
      }

      message.user.balance[0] -= invest;

     message.user.invest += Number(message.text)
     message.send(`Вы инвестировали ${message.text}₽`)
   }
});


console.log('Script started');

vk.updates.start();

let link = `https://vk.com/coin#x${config.owners[1]}_1000000000_-${config.group}_1`

const menu = JSON.stringify({
 "inline": false,
 "one_time": false,
 "buttons": [
   [{
     "action": {
       "type": "text",
       "payload": "{\"button\": \"инвестировать\"}",
       "label": `🔥 Инвестировать`
     },
     "color": "positive"
   }],
   [{
     "action": {
       "type": "text",
       "payload": "{\"button\": \"профиль\"}",
       "label": `🙍 Мой профиль`
     },
     "color": "primary"
   }, {
     "action": {
       "type": "text",
       "payload": "{\"button\": \"топ\"}",
       "label": `🙍 Лучшие игроки`
     },
     "color": "primary"
   }],
   [{
     "action": {
       "type": "text",
       "payload": "{\"button\": \"вывод\"}",
       "label": `♻ Вывод средств`
     },
     "color": "positive"
 }, {
     "action": {
       "type": "text",
       "payload": "{\"button\": \"пополнить\"}",
       "label": `♻ Пополнение`
     },
     "color": "positive"
   }],
      [{
     "action": {
       "type": "text",
       "payload": "{\"button\": \"nastr\"}",
       "label": `🆕 Улучшить доход 🆕`
     },
     "color": "primary"
   }],
 ]
})
