// SrockBot v0.0.1
// --> 06/03/25
//js - node.js - react 

//librerie richieste''

//gestisce più exchange con un unica api
const ccxt = require('ccxt');
const ccxtpro = require('ccxt.pro');

//x interagire con i smart contract sulla blockchain
const {ethers} = require('ethers');
const web3 = require('web3');
const bigNumb =require('bignumber.js');
//bignumber.js
//#*#*#*#*#*#*#**#*#*#**#*#*#*#*#*#*#*

class GetPrice {
   constructor (coppia,dexName){
      this.coppia=coppia;
      this.dex=dexName;
      this.dexIstanza=0;
   }
   async dexIns (){
      if(this.dex==='binance'){
         this.dexIstanza=new ccxt.binance();
         const ticker= await this.dexIns.fetchTicker(this.coppia)
         console.log(ticker);
      }
   }
   async price(){
      
   }
}
let tellMe=new GetPrice('BTC/USDT','binance')

/*
 ARBITRAGGIO SPAZIALE (inter exchange Arbitrage)
acquista un moneta su exchange ,dv il prezzo è piu basso, e
rivendi su un altro exchange dv il prezzo è piu alto!
[bisogna spostare le crypto da un cex all'altro, controllare commisioni di rete e fee di trasferimento ]


ARBITRAGGIO TRIANGOLARE (Triangular Arbitrage)
si svolge all'interno dello stesso exchange..
sfrutta la differenza di prezzo tra 3 o più coppie
[velocità di esecuzione]

--- ESEMPIO: BTC,ETH,USDT
1)CON 100USDT COMPRI 0.1BTC
2)CON 0.1 BTC COMPRI 0.5ETH
3)VENDI 0.5ETH X 110 USDT
se le conversioni sono faverovoli avrai più usdt di quanti ne avevi all'inizio!


Piattaforme: CEX & DEX
X Velocizzare ci vorrebbe RUST(BEST PERFORMANCE)..sti cazzi. :))

CEX : Binance, BYBIT, Kucoin, gate.io
DEX : Raydium(sol) , Uniswap -Arbitrum/Optimism/Base(eth Layer 2) , pancakeswap(bsc)
*/
