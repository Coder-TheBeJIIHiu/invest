exports.execute = async (message, menu, utils, vk) => {
    if(message.user.bonus  > 0) return message.send(`🎁 До получения бонуса осталось ${await utils.displayTime(message.user.bonus)}`);

    message.user.balance[1] += 2
    message.user.bonus = 86400;

    message.send(`🤑 Ты получил бонус в размере 2₽ на баланс инвестиций. Приходи завтра за новым.`)
};

exports.info = {
    name: [
        "бонус"
    ],
    access: false
};
