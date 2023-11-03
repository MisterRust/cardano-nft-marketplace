import { Constr, Data, Lucid, fromHex, toHex } from "lucid-cardano";
import { encode } from 'cbor-x';
import data from './plutus.json';
import axios from "axios";
/**
 * The `buyNFT` function is a TypeScript function that allows a user to buy a non-fungible token (NFT)
 * by creating and submitting a transaction on the blockchain.
 * @param {string} address - The `address` parameter is a string representing the address of the buyer
 * who wants to purchase the NFT.
 * @param {Lucid} lucid - The `lucid` parameter is an object that provides various utility functions
 * and methods related to the blockchain network you are interacting with. It is likely an instance of
 * a Lucid class or a similar library specific to your blockchain network.
 * @param {string} utxoValue - The `utxoValue` parameter is the hash of the UTXO (Unspent Transaction
 * Output) that represents the NFT listing you want to buy. It is a unique identifier for the specific
 * NFT you want to purchase.
 * @returns a boolean value. If the transaction hash (txHash) is successfully generated, the function
 * returns true. Otherwise, it returns false.
 */
export const buyNFT = async (address: string, lucid: Lucid, utxoValue: string) => {
    console.log("----->", address, lucid, utxoValue)
    try {
        const marketScript = {
            type: "PlutusV2",
            script: toHex(encode(fromHex(data.validators[0].compiledCode)))
        };


        // @ts-ignore
        const validatorHash = await lucid.utils.validatorToScriptHash(marketScript);
        console.log("validator hash")
        console.log(validatorHash)
        const CredentialSC = await lucid.utils.scriptHashToCredential(validatorHash);
        let api = undefined
        // @ts-ignore
        window.connect = async function connect(wallet) {
            api = await window.cardano[wallet].enable();
            localStorage.setItem('wallet', wallet);
        }




        var wallet = "nami"
        api = await window.cardano[wallet].enable();
        lucid.selectWallet(api);
        // @ts-ignore
        window.owner = await lucid.wallet.address()
        const { paymentCredential, stakeCredential } = lucid.utils.getAddressDetails(
            address
        );


        // const address = await lucid.wallet.address()


        var redeemerRequest = Data.to(
            new Constr(1, [])
        )
        console.log("redeemerRequest", redeemerRequest)
        //THIS IS THE TXHASH OF THE LISTING I WANT TO BUY
        const utxoHash = utxoValue
        console.log("utxoHash", utxoHash)
        const index = 0
        var utxo = await lucid.utxosByOutRef([{ txHash: utxoHash, outputIndex: index }])
        var datumUtxo = Data.from(utxo[0].datum)//qua cbor
        console.log("utxo", utxo)
        console.log("datumUtxo", datumUtxo)
        // @ts-ignore
        let pubSeller = datumUtxo.fields[0].fields[0].fields[0]
        // @ts-ignore
        let stakeSeller = datumUtxo.fields[0].fields[1].fields[0].fields[0].fields[0]
        const pubKeyCredentials = lucid.utils.keyHashToCredential(pubSeller);
        const stakeKeyCredentials = lucid.utils.keyHashToCredential(stakeSeller);
        const addressSeller = lucid.utils.credentialToAddress(pubKeyCredentials, stakeKeyCredentials);

        // @ts-ignore
        let pubMarketplace = datumUtxo.fields[8].fields[0].fields[0]
        // @ts-ignore
        let stakeMarketplace = datumUtxo.fields[8].fields[1].fields[0].fields[0].fields[0]
        const pubKeyCredentialsMarketplace = lucid.utils.keyHashToCredential(pubMarketplace);
        const stakeKeyCredentialsMarketplace = lucid.utils.keyHashToCredential(stakeMarketplace);
        const addressMarketplace = lucid.utils.credentialToAddress(pubKeyCredentialsMarketplace, stakeKeyCredentialsMarketplace);

        // @ts-ignore
        let pubRoyalty = datumUtxo.fields[4].fields[0].fields[0]
        // @ts-ignore
        let stakeRoyalty = datumUtxo.fields[4].fields[1].fields[0].fields[0].fields[0]
        const pubKeyCredentialsRoyalty = lucid.utils.keyHashToCredential(pubRoyalty);
        const stakeKeyCredentialsRoyalty = lucid.utils.keyHashToCredential(stakeRoyalty);
        const addressRoyalty = lucid.utils.credentialToAddress(pubKeyCredentialsRoyalty, stakeKeyCredentialsRoyalty);


        // @ts-ignore
        let unit = datumUtxo.fields[1] + datumUtxo.fields[2]
        // @ts-ignore
        let amount = datumUtxo.fields[3]

        // @ts-ignore
        let unitFee = datumUtxo.fields[9] + datumUtxo.fields[10]
        // @ts-ignore
        let amountFee = datumUtxo.fields[11]
        // @ts-ignore
        let unitRoyalty = datumUtxo.fields[5] + datumUtxo.fields[6]
        // @ts-ignore
        let amountRoyalty = datumUtxo.fields[7]
        let price = {
        }
        if (unit === "") {
            price['lovelace'] = amount
        } else {
            price[unit] = amount
        }

        console.log(unitFee)
        console.log(amountFee)

        let priceFee = {
        }

        if (unitFee === "") {
            priceFee['lovelace'] = amountFee
        } else {
            priceFee[unit] = amountFee
        }

        let priceRoyalty = {
        }

        if (unitRoyalty === "") {
            priceRoyalty['lovelace'] = amountRoyalty
        } else {
            priceRoyalty[unit] = amountRoyalty
        }


        console.log(redeemerRequest)
        console.log(price)
        console.log(addressSeller)
        console.log(utxo)

        console.log(priceFee)
        console.log(addressMarketplace)

        console.log(priceRoyalty)


        const tx = await lucid
            .newTx()
            .collectFrom(utxo, redeemerRequest)
            .payToAddress(addressSeller, price)
            .payToAddress(addressMarketplace, priceFee)
            .payToAddress(addressRoyalty, priceRoyalty)
            // @ts-ignore
            .attachSpendingValidator(marketScript)
            .complete()


        const signedTx = await tx.sign().complete();
        const txHash = await signedTx.submit();
        console.log("txHash", txHash)
        if (txHash) {
            return {
                result: "success"
            };
        }
    } catch (err) {
        console.log("err", err)
        return {
            result: "fail",
            error: err
        }
    }
}