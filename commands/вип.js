const { VK } = require('vk-io');
let config = require('../config.json');
let users = require('../base/users.json');
const vk = new VK({ token: config.token });

exports.execute = async (message, menu, utils, vk) => {
  if(!message.args[1]) return;

  let vip_user = users.find(vip => vip.uid == message.args[1])
  if(!vip_user) return message.send(`Такого пользователя не существует.`)

  vip_user.status = "Вип"
  vip_user.balance[1] += 10

  message.send(`Вы выдали VIP [id${vip_user.id}|данному пользователю].`)
  message.send(`Administator выдал вам VIP статус.`, {user_id: vip_user.id})
};

exports.info = {
    name: [
        "vip",
        "вип"
    ],
    access: true
};
