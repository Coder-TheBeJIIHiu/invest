let promo = require('../base/promos.json');
let utils = require('../utils.js')

exports.execute = async (message) => {
    if(message.args[1] == "stats" || message.args[1] == "стата") {
        let promos_info = `📚 Информация о промокодах:\n`;

        promo.map(x => {
            promos_info += `<<${x.name}>> - ${x.activations - x.users.length}/${x.activations} активаций | ${x.give}₽\n`;
        })

        return message.send(promos_info);
    }

    if(!message.args[1]) return
    if(!Number(message.args[2])) return
    if(!Number(message.args[3])) return

    if(!promo.find(x => x.name.toLowerCase() == message.args[1].toLowerCase())) {
      promo.push({
        name: message.args[1],
        activations: Number(message.args[2]),
        give: Number(message.args[3]),
        users: []
      })

      message.send(`🖥 Вы создали промокод:\n• Название: ${message.args[1]}\n• Рублей: ${message.args[3]}\n• Активаций: ${message.args[2]}`)
    } else {
      let promocode = promo.find(x => x.name.toLowerCase() == message.args[1].toLowerCase());

      promocode.activations = Number(message.args[2]);
      promocode.give = Number(message.args[3]);
      promocode.users = [];

      message.send(`🖥 Вы пересоздали промокод:\n• Название: ${message.args[1]}\n• Рублей: ${await utils.space(message.args[3])}\n• Активаций: ${message.args[2]}`)
    }

    require('fs').writeFileSync('./base/promos.json', JSON.stringify(promo, null, '\t'));
};

exports.info = {
    name: ["/промо", "/promo"],
    access: true
};
