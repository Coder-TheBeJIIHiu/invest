const { VK } = require('vk-io');
let config = require('../config.json');
let users = require('../base/users.json');
const vk = new VK({ token: config.token });

exports.execute = async (message, menu, utils, vk) => {
if(!message.args[1]) return;

let vip_user = users.find(vip => vip.uid == message.args[1])
if(!vip_user) return message.send(`Такого пользователя не существует.`)

  vip_user.status = "Игрок"
  vip_user.balance[0] = 0,
  vip_user.balance[1] = 0,
  vip_user.limit = 500000000000000000,
  vip_user.invest = 0

message.send(`Вы обнулили [id${vip_user.id}|данного пользователя].`)
message.send(`Ваш аккаунт обнулен`, {user_id: vip_user.id})
};

exports.info = {
name: [
"обнулить"
],
access: true
};