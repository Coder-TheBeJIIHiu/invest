const { VK } = require('vk-io');
let config = require('../config.json');
let users = require('../base/users.json');
const vk = new VK({ token: config.token });

exports.execute = async (message, menu, utils, vk) => {
  if(!message.args[1] || !message.args[2]) return;

  let vip_user = users.find(vip => vip.uid == message.args[1])
  if(!vip_user) return message.send(`Такого пользователя не существует.`)

  vip_user.balance[1] += Number(message.args[2])

  message.send(`Вы выдали ${message.args[2]}₽ [id${vip_user.id}|данному пользователю].`)
  message.send(`Administator выдал вам ${message.args[2]}₽.`, {user_id: vip_user.id})
};

exports.info = {
    name: [
        "give",
        "выдать"
    ],
    access: true
};
