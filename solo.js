
const Web3 = require('web3')
const config = require("./config.json")
const contractApi = require("./utils/contractApis")
const api = require("./utils/apis")
const tool = require("./utils/tools")
require('dotenv').config()
const web3 = new Web3(new Web3.providers.HttpProvider())

/**
 * 🚀View Only Funtions
 */
async function newSeed(){
    var tmp = [];
    for (var i = 0 ; i < config.soloSize ; i ++){
        var tmper =(await web3.eth.accounts.create());
        tmp.push({
            "raw":tmper.address,
            "address":tool.getHex(tmper.address),
            "private":tmper.privateKey
        })
    }
    return tmp;
}


async function signLoop(t){
    var address = await newSeed() //[{"address":tool.getHex("0x6f69388f225220a7d91ce9cb52b0e9fe95ae1e12"),"private":""},{"address":tool.getHex("0x9c33eacc2f50e39940d3afaf2c7b8246b681a374"),"private":""}]//await newSeed();
    var tmp = [];
    address.forEach(addressE => {
        tmp.push(tool.getHex(addressE.address));
    });
    // console.log(await contractApi.checkBalanceDetails(tmp[0],config.tokens))
    var status =await contractApi.checkBalanceGroup(tmp,config.tokens);
    console.log(status);
    if(status){
        console.log(JSON.stringify(address))
        console.log("##solo now##")
        address.forEach(addressE => {
            console.log(addressE)
        });
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