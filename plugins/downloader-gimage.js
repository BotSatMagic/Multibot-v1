let { promisify } = require('util')
let _gis = require('g-i-s')
let gis = promisify(_gis)

let handler  = async (m, { conn, args, text, usedPrefix, command }) => {
const fkontak = {
	"key": {
    "participants":"0@s.whatsapp.net",
		"remoteJid": "status@broadcast",
		"fromMe": false,
		"id": "Halo"
	},
	"message": {
		"contactMessage": {
			"vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
		}
	},
	"participant": "0@s.whatsapp.net"
}   
  
  if (!text) return m.reply(`${mg}*Escriba el nombre para buscar la Imagen!!*\n\n*EJEMPLO*\n*${usedPrefix + command}* Animales`)
  let results = await gis(text) || []
  let { url, width, height } = pickRandom(results) || {}
  if (!url) return m.reply('Not Found')
  conn.send3ButtonImg(m.chat, url, `
๐ช *Resultado de:* _${text}_`.trim(), `ษขแดแดษขสแด ษชแดแดษขแดษด\nแดษดแดสแด โข ${width} | แดสแดแดสแด โข ${height}\n${wm}`, '๐ฆ๐๐๐จ๐๐๐ก๐ง๐  ๐', `.gimage ${text}`, '๐ ๐๐จ๐ฆ๐๐๐ฅ ๐๐ก ๐ฃ๐๐ก๐ง๐๐ฅ๐๐ฆ๐ง', `${usedPrefix}pinterest ${text}`, '๐ ๐๐ก๐จ ๐ฃ๐ฅ๐๐ก๐๐๐ฃ๐๐ โก', `.menu`, m)
}
handler.help = ['image | gimage *texto*']
handler.tags = ['internet', 'downloader']
handler.command = /^(gimage|googleimage|image|images)$/i

module.exports = handler

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}
