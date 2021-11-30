const { VK } = require('vk-io');
let config = require('../config.json');
let users = require('../base/users.json');
const vk = new VK({ token: config.token });

exports.execute = async (message, menu, utils, vk) => {
  if(!message.args[1]) {
      message.send(`Ваш QIWI номер: ${!message.user.number ? `неизвестно` : message.user.number}, чтобы изменить введите <<номер [новый номер]>>`)
  } else {
      message.user.number = message.args[1];

      message.send(`Установлен новый QIWI номер: ${message.args[1]}`)
  };
};

exports.info = {
    name: [
        "номер"
    ],
    access: false
};
