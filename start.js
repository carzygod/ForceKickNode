
const Web3 = require('web3')
const config = require("./config.json")
const contractApi = require("./utils/contractApis")
const api = require("./utils/apis")
const tool = require("./utils/tools")
require('dotenv').config()

async function signLoop(t){
    var address = (await api.getSeed(t)).data[0];
    for(var i = 0 ; i < address.length ; i ++){
        address[i]=tool.getHex(address[i].address);
    }
    var status =await contractApi.checkBalanceGroup(address,config.tokens);
    console.log(status);
    if(status){
        exit(0);
    }
    return 0;
}


async function init(){
    var i = 1 ;
    while(true){
        try{
            console.log(Date())
            await signLoop(i);
        }
        catch(e){
            console.log(e);
        }
        i++;
        console.log(i);
    }

}
init()