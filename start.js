
const Web3 = require('web3')
const config = require("./config.json")
const contractApi = require("./utils/contractApis")
const api = require("./utils/apis")
const tool = require("./utils/tools")
require('dotenv').config()

async function signLoop(t){
    var address = (await api.getSeed(t)).data;
    var tmp = [];
    address.forEach(addressE => {
        for(var i = 0 ; i < addressE.length ; i ++){
            tmp.push(tool.getHex(addressE[i].address));
        }
    });

    var status =await contractApi.checkBalanceGroup(tmp,config.tokens);
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