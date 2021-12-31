let sends = require('../base/sends.json');
let config = require('../config.json');
let users = require('../base/users.json');

const { VK } = require('vk-io');
const vk = new VK({ token: config.group_token });

const Qiwi = require('node-qiwi-api').Qiwi;
const Wallet = new Qiwi(config.qiwi_token);

exports.execute = async (message, menu, utils, vk) => {
  console.log(config.qiwi_token)
    let send = sends.find(x => x.id == message.args[1]);

    if(send.paid_for) return message.send(`Данный заказ уже оплачен.`);

    send.paid_for = true;
    num = users.find(x => x.id == send.userId).number
  message.reply(num)
    Wallet.toWallet({ amount: send.count, comment: "🤑 Вывод", account: num }, async (err, data) => {
        message.reply(data);
console.log(send.id+" Оплачен")
   message.reply(`Вы оплатили заказ №${send.id}`);
      message.send(`🔔 Ваш вывод успешно одобрен.`, { user_id: send.userId, forward_messages: send.messageId })

        await utils.save(sends, "sends")
    });
};

exports.info = {
    name: [
        "отправить"
    ],
    access: true
};
