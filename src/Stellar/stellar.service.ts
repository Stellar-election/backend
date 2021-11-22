import {Injectable} from "@nestjs/common";
import axios from "axios";
import {CreateUserWallet} from "./dto/UserVote.dto";

const StellarSdk = require('stellar-sdk');

require('lodash');
@Injectable()
export class StellarService {
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
        const citizenId = UserWallet.citizenId
        const backCard = UserWallet.backCard
        const password = UserWallet.password
        const temp = citizenId + backCard + password
        const seed = StellarSdk.StrKey.encodeEd25519SecretSeed(temp).substring(0,32)
        const keyPair = StellarSdk.Keypair.fromRawEd25519Seed(seed);
        const secret = keyPair.secret()
        const account = keyPair.publicKey()
        
        await this.addFund(account)

        return { "account": account }
    }
}
