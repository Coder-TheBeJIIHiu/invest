const { VK } = require('vk-io');
let config = require('../config.json');
let utils = require('../utils.js');
let users = require('../base/users.json');
const vk = new VK({ token: config.group_token });

exports.execute = async (message, menu) => {

	let top = [];

  users.filter(x => x.ban == false).map(x => {
    top.push({ users: x.refs.length, nick: x.name, id: x.id, status: x.status });
  });

  top.sort((a, b) => {
  return b.users - a.users;
  });

  let text = ``;

  let num = 1
  let us = users.length
  if(us > 5) {
  	us = 5
  }

  for (let i = 0; i < us; i++) {
  	if(!top[i]) return;
  	const user = top[i];

		text += `${num}. ${user.status == "Вип" ? `VIP` : user.status == "Премиум" ? `PREMIUM` : ``} @id${user.id} (${user.nick}) пригласил ${user.users} пользователей
`
  	num++
  }

	message.send(`Топ рефералов: \n` + text, {
    keyboard: menu,
		disable_mentions: 1
  })
}

exports.info = {
	name: [
		"топ_рефералов"
	],
	access: false
}
