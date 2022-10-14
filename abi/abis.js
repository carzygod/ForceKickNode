
const ERC20ABI = require("./ERC20.json");
const kickAbi = require("./kick.json")
require('dotenv').config()
const abiConfig ={
    "kick":{
        "address":"0x4181418DDEfa8C9935bf0066B9C161605e30Ba7F",
        "abi":kickAbi
    },
    "Erc20":{
        "abi":ERC20ABI
    }
}

function getConfig(functions){
    return abiConfig[functions];
}
module.exports = {
    getConfig
}