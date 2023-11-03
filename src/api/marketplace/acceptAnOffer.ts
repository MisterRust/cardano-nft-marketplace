import { Constr, Data, Lucid, fromHex, toHex } from "lucid-cardano";
import { encode } from 'cbor-x';
import data from './plutus.json';
export const acceptAnOffer = async (address: string, lucid: Lucid, listingUtxoValue: string, offerUtxoValue: string, assetValue: string) => {
    try {
  
      const rentScript = {
        type: "PlutusV2",
        script: toHex(encode(fromHex(data.validators[0].compiledCode)))
      };
  
      const { paymentCredential, stakeCredential } = lucid.utils.getAddressDetails(
        await address
      );
      console.log("paymentCredential", paymentCredential)
      var redeemerRequest = Data.to(
        new Constr(0, [])
      )
  
      //THIS IS THE TXHASH OF THE LISTING OF THE NFT
      const utxoHash = listingUtxoValue
      const index = 0
      var utxo = await lucid.utxosByOutRef([{ txHash: utxoHash, outputIndex: index }])
      console.log(utxo)
  
      var redeemerOffer = Data.to(
        new Constr(1, [])
      )
      console.log("redeemerRequest", redeemerRequest)
      console.log("utxoHash", utxoHash)
      console.log("utxo", utxo)
      console.log("redeemerOffer", redeemerOffer)
  
      //THIS IS THE TX OF THE OFFER 
  
      const utxoHashOffer = offerUtxoValue
      const indexOffer = 0
      var utxoOffer = await lucid.utxosByOutRef([{ txHash: utxoHashOffer, outputIndex: indexOffer }])
      let datumUtxo = Data.from(utxoOffer[0].datum)
      // @ts-ignore
      let pubSeller = datumUtxo.fields[0].fields[0].fields[0]
      // @ts-ignore
      let stakeSeller = datumUtxo.fields[0].fields[1].fields[0].fields[0].fields[0]
      const pubKeyCredentials = lucid.utils.keyHashToCredential(pubSeller);
      const stakeKeyCredentials = lucid.utils.keyHashToCredential(stakeSeller);
      const addressSeller = lucid.utils.credentialToAddress(pubKeyCredentials, stakeKeyCredentials);
  
      console.log("utxoHashOffer", utxoHashOffer)
      console.log("indexOffer", indexOffer)
      console.log("utxoOffer", utxoOffer)
      console.log("datumUtxo", datumUtxo)
      console.log("pubSeller", pubSeller)
      console.log("stakeSeller", stakeSeller)
      console.log("pubKeyCredentials", pubKeyCredentials)
      console.log("stakeKeyCredentials", stakeKeyCredentials)
      console.log("addressSeller", addressSeller)
  
      // @ts-ignore
      let pubMarketplace = datumUtxo.fields[8].fields[0].fields[0]
      // @ts-ignore
      let stakeMarketplace = datumUtxo.fields[8].fields[1].fields[0].fields[0].fields[0]
      const pubKeyCredentialsMarketplace = lucid.utils.keyHashToCredential(pubMarketplace);
      const stakeKeyCredentialsMarketplace = lucid.utils.keyHashToCredential(stakeMarketplace);
      const addressMarketplace = lucid.utils.credentialToAddress(pubKeyCredentialsMarketplace, stakeKeyCredentialsMarketplace);
      console.log("stakeMarketplace", stakeMarketplace)
      console.log("stakeMarketplace", stakeMarketplace)
      console.log("pubKeyCredentialsMarketplace", pubKeyCredentialsMarketplace)
      console.log("stakeKeyCredentialsMarketplace", stakeKeyCredentialsMarketplace)
      console.log("addressMarketplace", addressMarketplace)
  
  
      // @ts-ignore
      let pubRoyalty = datumUtxo.fields[4].fields[0].fields[0]
      // @ts-ignore
      let stakeRoyalty = datumUtxo.fields[4].fields[1].fields[0].fields[0].fields[0]
      const pubKeyCredentialsRoyalty = lucid.utils.keyHashToCredential(pubRoyalty);
      const stakeKeyCredentialsRoyalty = lucid.utils.keyHashToCredential(stakeRoyalty);
      const addressRoyalty = lucid.utils.credentialToAddress(pubKeyCredentialsRoyalty, stakeKeyCredentialsRoyalty);
      console.log("pubRoyalty", pubRoyalty)
      console.log("stakeRoyalty", stakeRoyalty)
      console.log("pubKeyCredentialsRoyalty", pubKeyCredentialsRoyalty)
      console.log("stakeKeyCredentialsRoyalty", stakeKeyCredentialsRoyalty)
      console.log("addressRoyalty", addressRoyalty)
  
      // @ts-ignore
      let unitFee = datumUtxo.fields[9] + datumUtxo.fields[10]
      // @ts-ignore
      let amountFee = datumUtxo.fields[11]
      // @ts-ignore
      let unitRoyalty = datumUtxo.fields[5] + datumUtxo.fields[6]
      // @ts-ignore
      let amountRoyalty = datumUtxo.fields[7]
  
      console.log("unitFee", unitFee)
      console.log("amountFee", amountFee)
      console.log("unitRoyalty", unitRoyalty)
      console.log("amountRoyalty", amountRoyalty)
  
      let priceFee = {
      }
  
      if (unitFee === "") {
        priceFee['lovelace'] = amountFee
      } else {
        // priceFee[unit] = amountFee
      }
  
      let priceRoyalty = {
      }
  
      if (unitRoyalty === "") {
        priceRoyalty['lovelace'] = amountRoyalty
      } else {
        // priceRoyalty[unit] = amountRoyalty
      }
  
      console.log("priceFee", priceFee)
      console.log("priceRoyalty", priceRoyalty)
  
      if (utxoHash < utxoHashOffer) {
        const tx = await lucid
          .newTx()
          .collectFrom(utxo, redeemerRequest)
          .collectFrom(utxoOffer, redeemerOffer)
          .payToAddress(address, { "lovelace": 1000000n })
          .payToAddress(address, { "lovelace": 1000000n })
          .payToAddress(address, { "lovelace": 1000000n })
          .payToAddress(addressSeller, { [assetValue]: 1n })
          .payToAddress(addressMarketplace, priceFee)
          .payToAddress(addressRoyalty, priceRoyalty)
          // @ts-ignore
          .attachSpendingValidator(rentScript)
          .addSignerKey(paymentCredential.hash)
          .complete();
        console.log("tx", tx)
        const signedTx = await tx.sign().complete();
        const txHash = await signedTx.submit();
        console.log(txHash)
      } else {
        console.log("caso easy")
  
        const tx = await lucid
          .newTx()
          .collectFrom(utxo, redeemerRequest)
          .collectFrom(utxoOffer, redeemerOffer)
          .payToAddress(addressSeller, { [assetValue]: 1n })
          .payToAddress(addressMarketplace, priceFee)
          .payToAddress(addressRoyalty, priceRoyalty)
          // @ts-ignore
          .attachSpendingValidator(rentScript)
          .addSignerKey(paymentCredential.hash)
          .complete();
  
        console.log("tx", tx)
  
  
        const signedTx = await tx.sign().complete();
        const txHash = await signedTx.submit();
        console.log(txHash)
        if (txHash) return true;
  
      }
    } catch (err) {
      console.log("err", err)
      return false
    }
  }