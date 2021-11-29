const { VK } = require('vk-io');
let config = require('../config.json');
let utils = require('../utils.js');
let users = require('../base/users.json');
const vk = new VK({ token: config.group_token });

exports.execute = async (message) => {
message.send(`🆕 Ферма #1

- Доход 20% от вложенных средств. ✅
- Ежедневный бонус 15 рублей. ✅
- За реферала 20 рублей. ✅

🔔 Для покупки данной фермы, оплатите по ссылке: <SOON> (QIWI)
🔔 Указав цену: 100 рублей`)
}

exports.info = {
name: [
"nastr"
],
access: false
}