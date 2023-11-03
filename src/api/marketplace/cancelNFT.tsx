import { Constr, Data, Lucid, fromHex, toHex } from "lucid-cardano";
import { encode } from 'cbor-x';
import data from './plutus.json';
import axios from "axios";
/**
 * The `cancelNFT` function cancels a non-fungible token (NFT) listing by creating and submitting a
 * transaction on the blockchain.
 * @param {Lucid} lucid - The `lucid` parameter is an instance of the `Lucid` class, which is used for
 * interacting with the blockchain and performing various operations such as creating transactions,
 * signing them, and submitting them to the network.
 * @param {string} address - The `address` parameter is a string representing the address of the user
 * who wants to cancel the NFT.
 * @param {string} utxoValue - The `utxoValue` parameter is the hash of the transaction output (UTXO)
 * that you want to cancel. It is used to identify the specific UTXO that you want to spend in the
 * transaction.
 * @returns a boolean value. If the transaction hash (txHash) is truthy, then it returns true.
 * Otherwise, it does not return anything.
 */
export const cancelNFT = async (lucid: Lucid, address: string, utxoValue: string) => {
    try {
      const rentScript = {
        type: "PlutusV2",
        script: toHex(encode(fromHex(data.validators[0].compiledCode)))
      };
  
  
      const { paymentCredential, stakeCredential } = await lucid.utils.getAddressDetails(
        await address,
      );
  
      var redeemerRequest = Data.to(
        new Constr(0, [])
      )
  
      //THIS IS THE TXHASH OF THE LISTING TO BE CANCELLED
      const utxoHash = utxoValue;
      const index = 0
      var utxo = await lucid.utxosByOutRef([{ txHash: utxoHash, outputIndex: index }])
      console.log(utxo)
  
  
      const tx = await lucid
        .newTx()
        .collectFrom(utxo, redeemerRequest)
        // @ts-ignore
        .attachSpendingValidator(rentScript)
        .addSignerKey(paymentCredential.hash)
        .complete();
  
      const signedTx = await tx.sign().complete();
      const txHash = await signedTx.submit();
      console.log(txHash)
      if (txHash) return true;
    } catch (err) {
      console.log("Error cancelNFT", err)
    }
  }
  
  