
const ERC20ABI = require("./ERC20.json");
const kickAbi = require("./kick.json")
require('dotenv').config()
const abiConfig ={
    "kick":{
        "address":"0x744ca087D2Ed7ab3c125e9F0EA864De9B19e51F9",
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