import { Constr, Data, Lucid, fromHex, toHex } from "lucid-cardano";
import { encode } from 'cbor-x';
import data from './plutus.json';
import axios from "axios";
/**
 * The `listNFTByAddress` function lists NFTs for a given address on a marketplace by creating and
 * submitting a transaction.
 * @param {string} address - The `address` parameter is a string representing the address of the user
 * who wants to list their NFTs for sale.
 * @param {Lucid} lucid - The `lucid` parameter is an object that represents the Lucid smart contract
 * platform. It provides various utility functions and methods for interacting with the Lucid
 * blockchain.
 * @param {string[]} assets - An array of strings representing the assets (NFTs) to be listed for sale.
 * @param {number} price - The `price` parameter is the price at which the NFTs will be listed for
 * sale. It is a number representing the price in a specific currency or unit.
 * @returns a boolean value. If the transaction hash (txHash) is successfully generated, the function
 * returns true. Otherwise, it returns false.
 */
export const listNFTByAddress = async (
    address: string, lucid: Lucid, assets: string[], nftPrice: number
  ) => {
    try {
      const marketScript = {
        type: "PlutusV2",
        script: toHex(encode(fromHex(data.validators[0].compiledCode)))
      };
  
      console.log("marketScript", marketScript)
  
      // @ts-ignore
      const validatorHash = await lucid.utils.validatorToScriptHash(marketScript);
      console.log("validator hash")
      console.log(validatorHash)
      const CredentialSC = await lucid.utils.scriptHashToCredential(validatorHash);
  
      // window.owner = await lucid.wallet.address()
      const { paymentCredential, stakeCredential } = await lucid.utils.getAddressDetails(
        address
      );
      console.log("credentials")
      console.log(paymentCredential.hash)
      console.log(stakeCredential.hash)
      const addressRequest = lucid.utils.credentialToAddress(CredentialSC);
      const payment_vkh = new Constr(0, [paymentCredential.hash]);
      const staking_vkh = new Constr(0, [stakeCredential.hash]); //secondo me qua è 0
      const staking_inline = new Constr(0, [new Constr(0, [staking_vkh])])
      const addressCbor = new Constr(0, [payment_vkh, staking_inline])
      console.log(addressCbor) //THIS IS FOR SELLER
  
      //let's calculate the fees address
  
      const payment_vkh2 = new Constr(0, [lucid.utils.getAddressDetails("addr1qyh9zj324a8j4uzd8t0wp4akgsa59pe8ex98j44ql3kcvd5x8n87hfmk3nu27q920sp28y0m0g4fvn3pxhc93mp6f78scg8duf").paymentCredential.hash]);
      const staking_vkh2 = new Constr(0, [lucid.utils.getAddressDetails("addr1qyh9zj324a8j4uzd8t0wp4akgsa59pe8ex98j44ql3kcvd5x8n87hfmk3nu27q920sp28y0m0g4fvn3pxhc93mp6f78scg8duf").stakeCredential.hash]); //secondo me qua è 0
      const staking_inline2 = new Constr(0, [new Constr(0, [staking_vkh2])])
      const addressCbor2 = new Constr(0, [payment_vkh2, staking_inline2])
  
  
      let price = nftPrice * 1000000
      let fee = 199 * price / 10000
  
  
      if (fee < 1000000) { fee = 1000000 }
      price = price - fee
      price = price * 50 / 100
  
      var datumRequest = Data.to(new Constr(0,
        [addressCbor,//policy Borrower
          "",//HERE THE POLICY OF THE TOKEN, if ADA is empty
          "",//HERE THE ASSETNAME IN HEX, if ADA is empty
          BigInt(price),//HERE THE PRICE BEWARE OF DECIMALES
          addressCbor,//policy Borrower
          "",//HERE THE POLICY OF THE TOKEN, if ADA is empty
          "",//HERE THE ASSETNAME IN HEX, if ADA is empty
          BigInt(price),//HERE THE PRICE BEWARE OF DECIMALES
          addressCbor2,
          "",//HERE THE POLICY OF THE TOKEN, if ADA is empty
          "",//HERE THE ASSETNAME IN HEX, if ADA is empty
          BigInt(fee),//HERE THE PRICE BEWARE OF DECIMALES
        ])
      );
      console.log(datumRequest)
  
      let nfts = {}
      //This is the unit of the NFT I want to sell policyid+assetname
      for (let i = 0; i < assets.length; i++) {
        nfts[assets[i]] = 1n;
      }
  
      const tx = await lucid
        .newTx()
        .payToContract(addressRequest, { inline: datumRequest }, nfts)
        .complete();
  
      const signedTx = await tx.sign().complete();
      const txHash = await signedTx.submit();
      console.log("txHash", txHash)
      if (txHash) return true;
    } catch (err) {
      console.log("Error listNFTByAddress", err)
      return false;
    }
  }