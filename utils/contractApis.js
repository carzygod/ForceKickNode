const Web3 = require('web3')
const contractConfig = require("../abi/abis")
const config = require("../config.json")
require('dotenv').config()
const web3 = new Web3(new Web3.providers.HttpProvider(config.provider))

/**
 * 🚀View Only Funtions
 */

async function checkBalanceGroup(tokens,address){
    const contractInfo = contractConfig.getConfig("kick");
    const  Ctr = new web3.eth.Contract(contractInfo.abi,contractInfo.address);
    var ret ; 
    await Ctr.methods.balanceGroup(tokens,address).call()
                .then(function(result){
                   ret = result;
            });
    return ret;
}


async function  doSignTransaction(txn){
    return await web3.eth.accounts.signTransaction(txn,process.env.PRIVATE_KEY);
}

/**
 */

async function signTxn(to,tx){
    
    const gas = await tx.estimateGas({from: process.env.PUBLIC_ADDRESS});
    const gasPrice = (await web3.eth.getGasPrice())*config.gasIncress;
    const gasComsume = gas*gasPrice/1e18;
    console.log(gasComsume);
    if(gasComsume>config.tradeSetting.gasLimit){
        console.log("##Reach Gas Limit . Pause Transaction##")
        return 0 ;
    }
    const data = tx.encodeABI();
    const nonce = await web3.eth.getTransactionCount(process.env.PUBLIC_ADDRESS);
    console.log(nonce)
    return await web3.eth.accounts.signTransaction(
        {
          to: to, 
          data,
          gas,
          gasPrice,
          nonce, 
          chainId: config.chainId
        },
        process.env.PRIVATE_KEY
      );
}

async function verfiTxnStatus(tx){
    const pendingTransactions = await web3.eth.getTransaction(tx)
    return pendingTransactions;
}
module.exports = {
    //View Only
    checkBalanceGroup,
    verfiTxnStatus
}