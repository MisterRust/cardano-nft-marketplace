import { Constr, Data, Lucid, fromHex, toHex } from "lucid-cardano";
import { encode } from 'cbor-x';
import data from './plutus.json';
export const editListedNFT = async (
    address: string, lucid: Lucid, nftPrice: number, assets: string[], utxoValue: string
  ) => {
    console.log("assets", assets)
    try {
      const marketScript = {
        type: "PlutusV2",
        script: toHex(encode(fromHex(data.validators[0].compiledCode)))
      };
  
  
      // @ts-ignore
      const validatorHash = await lucid.utils.validatorToScriptHash(marketScript);
      console.log("validator hash")
      console.log(validatorHash)
      const CredentialSC = lucid.utils.scriptHashToCredential(validatorHash);
  
      let api = undefined
  
  
      let { paymentCredential, stakeCredential } = await lucid.utils.getAddressDetails(
        address
      );
      const addressRequest = await lucid.utils.credentialToAddress(CredentialSC);
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
  
  
      //THIS IS VERY IMPORTANT
      //NOW LET'S SET 
      var redeemerRequest = Data.to(
        new Constr(0, [])
      )
  
  
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
  
      console.log("nfts", nfts)
  
      //THIS IS THE TXHASH OF THE LISTING TO BE EDITED
      const utxoHash = utxoValue;
      const index = 0
      var utxo = await lucid.utxosByOutRef([{ txHash: utxoHash, outputIndex: index }])
      console.log(utxo)
  
  
      const tx = await lucid
        .newTx()
        .collectFrom(utxo, redeemerRequest)
        // @ts-ignore
        .attachSpendingValidator(marketScript)
        .addSignerKey(paymentCredential.hash)
        .payToContract(addressRequest, { inline: datumRequest }, nfts)
        .complete()
  
      console.log(tx)
  
      const signedTx = await tx.sign().complete();
      const txHash = await signedTx.submit();
      console.log(txHash)
      if (txHash) return true;
    } catch (err) {
      console.log('Error editListedNFT', err)
      return false
    }
  }