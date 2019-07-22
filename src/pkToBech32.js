var encode = require('./bech32').encode
var toWords = require('./bech32').toWords

function pubkeyToBech32(pubkey, prefix) {
    // '1624DE6420' is ed25519 pubkey prefix
    let pubkeyAminoPrefix = Buffer.from('1624DE6420', 'hex')
    let buffer = Buffer.alloc(37)
    pubkeyAminoPrefix.copy(buffer, 0)
    Buffer.from(pubkey, 'base64').copy(buffer, pubkeyAminoPrefix.length)
    return encode(prefix, toWords(buffer))
}

module.exports = {
    pubkeyToBech32: pubkeyToBech32
  }