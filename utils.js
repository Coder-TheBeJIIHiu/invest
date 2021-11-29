const { VK } = require('vk-io');
const fs = require('fs');
let config = require('./config.json');
const vk = new VK({ token: config.token });
const user = new VK({ token: config.user_token })

function pad(n, width) {
  var n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
};

function displayTime(ticksInSecs) {
  var ticks = ticksInSecs;
  var hh = Math.floor(ticks / 3600);
  var mm = Math.floor((ticks % 3600) / 60);

  var ss = ticks % 60;

  return( pad(hh, 2) + ":" + pad(mm, 2) + ":" + pad(ss, 2) );
};

function timers(ticks) {
  var hh = Math.floor(ticks / 3600);
  var mm = Math.floor((ticks % 3600) / 60);

  var ss = ticks % 60;

  return( pad(mm, 2) + ":" + pad(ss, 2) );
};

async function getID(message, string) {
    if(message.replyMessage) return message.replyMessage.senderId;

    string = string.replace(/\|(.*)]/ig, '');
    string = string.replace(/\[/ig, '');
    string = string.replace(/\]/ig, '');
    string = string.replace(/https/ig, '');
	  string = string.replace(/http/ig, '');
	  string = string.replace(/\:/ig, '');
    string = string.replace(/m\.vk\.com/ig, '');
    string = string.replace(/vk\.com\/id/ig, '');
	  string = string.replace(/vk\.com/ig, '');
    string = string.replace(/\//ig, '');

    if(Number(string)) return string;

    let id = await user.api.utils.resolveScreenName({screen_name: string});
    return id.type == "group" ? id.object_id*(-1) : id.object_id;
};

async function save(db, name) {
    require('fs').writeFileSync('./base/' + name + '.json', JSON.stringify(db, null, '\t'));
};

async function random(x, y) {
    return y ? Math.round(Math.random() * (y - x)) + x : Math.round(Math.random() * x);
}

async function sp(int) {
    return int.toString().split('').reverse().join('').match(/[0-9]{1,3}/g).join('.').split('').reverse().join('');
}

async function space(int) {
    return int.toFixed(2);
    // return int.toString().split('').reverse().join('').match(/[0-9]{1,3}/g).join(' ').split('').reverse().join('');
}

exports.getID = getID;
exports.save = save;
exports.random = random;
exports.sp = sp;
exports.space = space;
exports.pad = pad;
exports.displayTime = displayTime;
exports.timers = timers;
