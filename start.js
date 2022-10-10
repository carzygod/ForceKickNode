
const Web3 = require('web3')
const config = require("./config.json")
const contractApi = require("./utils/contractApis")
const api = require("./utils/apis")
const tool = require("./utils/tools")
require('dotenv').config()

async function signLoop(t){
    var address = await api.getSeed(t);
    for(var i = 0 ; i < address.length ; i ++){
        address[i]= tool.getTokenHex(address[i]);
    }
    var status = contractApi.checkBalanceGroup(config.tokenList,address);
    console.log(status);
    return 0;
}


async function init(){
    var i = 1 ;
    while(true){
        try{
            await signLoop(i);

        }
        catch(e){
            console.log(e);
        }
        //await tool.sleep(config.tradeSetting.monitInterval);
        i++;
        console.log(i);
    }

}
init()