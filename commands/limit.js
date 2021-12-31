const { VK } = require('vk-io');
let config = require('../config.json');
let users = require('../base/users.json');
const vk = new VK({ token: config.token });

exports.execute = async (message, menu, utils, vk) => {
  if(!message.args[1] || !message.args[2]) return;

  let vip_user = users.find(vip => vip.uid == message.args[1])
  if(!vip_user) return message.send(`Такого пользователя не существует.`)

  vip_user.limit += Number(message.args[2])

  message.send(`Вы выдали лимит ${message.args[2]}₽ [id${vip_user.id}|данному пользователю].`)
  message.send(`[id${message.senderId}|Администатор] выдал вам лимит ${message.args[2]}₽.`, {user_id: vip_user.id})
};

exports.info = {
    name: [
        "лимит",
        "limit"
    ],
    access: true
};
