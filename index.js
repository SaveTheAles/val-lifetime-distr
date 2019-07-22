var pubkeyToBech32 = require('./src/pkToBech32').pubkeyToBech32

let pubkeysSet = require('./balance.json');
let pubKeysArr = Object.getOwnPropertyNames(pubkeysSet);
let newPubKeySet = {};

for (let i = 0; i < pubKeysArr.length; i++) {
  let pk = pubKeysArr[i];
  let validator = pubkeyToBech32(pk,'cybervalconspub');
  newPubKeySet[validator] = pubkeysSet[pubKeysArr[i]];
}

let validatorsSet = require('./validators_list.json');
let newPubKeysArr = Object.getOwnPropertyNames(newPubKeySet);
let result = [];

for (let i = 0; i < newPubKeysArr.length; i++) {
    let validator = {}
    for (j = 0; j < validatorsSet.result.length; j++) {
        if (newPubKeysArr[i].toString() == validatorsSet.result[j].consensus_pubkey) {
            validator.operator_address = validatorsSet.result[j].operator_address;
            validator.consensus_pubkey = validatorsSet.result[j].consensus_pubkey;
            validator.moniker = validatorsSet.result[j].description.moniker;
            validator.reward = newPubKeySet[newPubKeysArr[i]];
        } else {
        }
    }
    result.push(validator);
}

let validatorsDistr = JSON.stringify(result);

var fs = require('fs');
fs.writeFile("validatorsDistr.json", validatorsDistr, function(err) {
    if (err) {
        console.log(err);
    }
});
