import {Injectable} from "@nestjs/common";
import axios from "axios";
import {CreateUserWallet, SendCoin} from "./dto/UserVote.dto";
import {TrustInfo, TrustInfoForCandidate} from "./dto/TrustInfo.dto";
import {Account} from "./dto/Account.dto";
import {GetCoin} from "./dto/GetCoin.dto";
import { gorv_data } from "src/CreateElection/models/createElections.entity";


const StellarSdk = require('stellar-sdk');
const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

require('lodash');
@Injectable()
export class StellarService {
    
    getKeyPair(UserWallet: CreateUserWallet) {
        const citizenId = UserWallet.citizenId
        const backCard = UserWallet.backCard
        const password = UserWallet.password
        const temp = citizenId + backCard + password
        const seed = StellarSdk.StrKey.encodeEd25519SecretSeed(temp).substring(0,32)
        const keyPair = StellarSdk.Keypair.fromRawEd25519Seed(seed);
        return keyPair;
    }
    async addFund(account: string)  {
        return await axios.get("/friendbot", {
            baseURL: 'https://horizon-testnet.stellar.org',
            params: { addr: account }
        })
    }

    async createIssuer() {
        const keyPair = StellarSdk.Keypair.random();
        const secret = keyPair.secret();
        const account = keyPair.publicKey();

        this.addFund(account)

        return { "account": account ,"secret": secret }
    }
    
    async createWallet(UserWallet: CreateUserWallet) {
        const keyPair = this.getKeyPair(UserWallet)
        const secret = keyPair.secret()
        const account = keyPair.publicKey()
        try{
            await this.addFund(account)
        } catch(e) {
            console.log('Account is created')
        }
        

        return { "account": account }
    }

    async getBalance(account: Account) {
        const sAccount = await server.loadAccount(account.account);
        const balance = parseInt(sAccount.balances[0]["balance"])
        return balance;
    }

    async trust(account: string, coin, secret) {
        server
        .loadAccount(account)
        .then(function (receiver) {
            var transaction = new StellarSdk.TransactionBuilder(receiver, {
            fee: 100,
            networkPassphrase: StellarSdk.Networks.TESTNET,
            })
            .addOperation(
                StellarSdk.Operation.changeTrust({
                asset: coin,
                }),
            )
            .setTimeout(100)
            .build();
            transaction.sign(secret);
            return server.submitTransaction(transaction);
        })
        .then(console.log('trust is created'))
        .catch(function (error) {
            console.error("Error!", error);
        });
    }

    async trustWithLimit(account: string, coin, secret) {
        server
        .loadAccount(account)
        .then(function (receiver) {
            var transaction = new StellarSdk.TransactionBuilder(receiver, {
            fee: 100,
            networkPassphrase: StellarSdk.Networks.TESTNET,
            })
            .addOperation(
                StellarSdk.Operation.changeTrust({
                asset: coin,
                limit: "1",
                }),
            )
            .setTimeout(100)
            .build();
            transaction.sign(secret);
            return server.submitTransaction(transaction);
        })
        .then(console.log('trust is created'))
        .catch(function (error) {
            console.error("Error!", error);
        });
    }
    
    async trustCoin(TrustInfoForCandidate: TrustInfoForCandidate) {
        const coinName = TrustInfoForCandidate.coinName
        const issuer = TrustInfoForCandidate.issuer
        const keyPair = StellarSdk.Keypair.fromSecret(TrustInfoForCandidate.secret)
        const coin = new StellarSdk.Asset(coinName, issuer);
        const account = keyPair.publicKey();

        this.trust(account, coin, keyPair)

        return { "status": 200 }
    }

    async trustCoinWithLimit(TrustInfo: TrustInfo) {
        const coinName = TrustInfo.coinName
        const issuer = TrustInfo.issuer
        const keyPair = this.getKeyPair(TrustInfo.userWallet)
        const coin = new StellarSdk.Asset(coinName, issuer);
        const account = keyPair.publicKey();

        this.trustWithLimit(account, coin, keyPair)

        return { "status": 200 }
    }

    async addCoin(account, coin, issuer, issuer_secret) {
        server
        .loadAccount(issuer)
        .then(function (issuer) {
            var transaction = new StellarSdk.TransactionBuilder(issuer, {
            fee: 100,
            networkPassphrase: StellarSdk.Networks.TESTNET,
            })
            .addOperation(
                StellarSdk.Operation.payment({
                destination: account,
                asset: coin,
                amount: "1",
                }),
            )
            
            .setTimeout(100)
            .build();
            transaction.sign(issuer_secret);
            return server.submitTransaction(transaction);
        })
        .then(console.log('the account is ready to vote'))
        .catch(function (error) {
            console.error("Error!", error);
        });
    }

    async getCoin(GetCoin: GetCoin) {
        const coinName = GetCoin.coinName
        const account = GetCoin.account
        const issuer = GetCoin.issuer
        const issuer_secret = GetCoin.issuer_secret
        const keyPair = StellarSdk.Keypair.fromSecret(issuer_secret)
        const coin = new StellarSdk.Asset(coinName, issuer);

        this.addCoin(account,coin,issuer,keyPair)

        return { "status": 200,}
    }

    async sendCoin(account, secret, coin, destination) {
        server
        .loadAccount(account)
        .then(function (voter) {
            var transaction = new StellarSdk.TransactionBuilder(voter, {
            fee: 100,
            networkPassphrase: StellarSdk.Networks.TESTNET,
            })
            .addOperation(
                StellarSdk.Operation.payment({
                destination: destination,
                asset: coin,
                amount: "1",
                }),
            )
            .addOperation(
                StellarSdk.Operation.changeTrust({
                asset: coin,
                limit: "0",
                
                }),
            )
            .setTimeout(100)
            .build();
            transaction.sign(secret);
            return server.submitTransaction(transaction);
        })
        .then(console.log)
        .catch(function (error) {
            console.error("Error!", error);
        });
    }

    async vote(sendCoin: SendCoin) {
        const coinName = sendCoin.coinName
        const destination = sendCoin.destination
        const issuer = sendCoin.issuer
        const keyPair = this.getKeyPair(sendCoin.userWallet)
        const account = keyPair.publicKey()

        const coin = new StellarSdk.Asset(coinName, issuer);

        this.sendCoin(account,keyPair,coin,destination)

        const updateAccount = await gorv_data.findOne({
            where: {
                citizen_id: sendCoin.userWallet.citizenId,
                area_name: sendCoin.coinName
            }
        })
        updateAccount.isvote = true;
        await gorv_data.save(updateAccount);
        
        return { "status": 200,}
    }

}
