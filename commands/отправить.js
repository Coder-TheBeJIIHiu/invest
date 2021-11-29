let sends = require('../base/sends.json');
let config = require('../config.json');
let users = require('../base/users.json');

const { VK } = require('vk-io');
const vk = new VK({ token: config.group_token });

const Qiwi = require('node-qiwi-api').Qiwi;
const Wallet = new Qiwi(config.qiwi_token);

exports.execute = async (message, menu, utils, vk) => {
    let send = sends.find(x => x.id == message.args[1]);

    if(send.paid_for) return message.send(`Данный заказ уже оплачен.`);

    console.log(send)
    send.paid_for = true;

    Wallet.toWallet({ amount: send.count, comment: "044 ROBOT", account: users.find(x => x.id == send.userId).number }, async (err, data) => {
        if(err) {
            console.log(err);
        }

        console.log(data);

       // vk.api.messages.edit({ peer_id: send.peerId, message_id: send.messageEdit, message: `✅ Заказ №${send.id} оплачен.` });

        message.send(`Вы оплатили заказ №${send.id}`);
        message.send(`🗣️ Оплачено (ждем отзыв).`, { user_id: send.userId, forward_messages: send.messageId })

        await utils.save(sends, "sends")
    });
};

exports.info = {
    name: [
        "отправить"
    ],
    access: true
};
