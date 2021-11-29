const { VK } = require('vk-io');
let config = require('../config.json');
let users = require('../base/users.json');
const vk = new VK({ token: config.token });

exports.execute = async (message, menu, utils, vk) => {
if(!message.args[1]) return;

let vip_user = users.find(vip => vip.uid == message.args[1])
if(!vip_user) return message.send(`Такого пользователя не существует.`)

vip_user.status = "Игрок"
vip_user.balance[1] += 0

message.send(`вы забрали PREMIUM у [id${vip_user.id}|данного пользователя].`)
message.send(`[Бот] Премиум статус кончился.`, {user_id: vip_user.id})
};

exports.info = {
name: [
"-премиум",
"-прем"
],
access: true
};