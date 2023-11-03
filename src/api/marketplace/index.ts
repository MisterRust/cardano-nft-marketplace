import { Constr, Data, Lucid, fromHex, toHex } from "lucid-cardano";
import { encode } from 'cbor-x';
import data from './plutus.json';
import axios from "axios";

/**
 * The function `getMyNFTListing` retrieves a list of NFTs listed by a specific address from an API and
 * filters the data to only include NFTs listed by that address.
 * @param {string} address - The `address` parameter is a string that represents the address of a user.
 * It is used to filter the NFT listings and retrieve only the listings where the seller's address
 * matches the provided address.
 * @returns The function `getMyNFTListing` returns a filtered object of `ListedNFTList` where the
 * `seller` property matches the provided `address`.
 */
export const getMyNFTListing = async (address: string) => {
  try {
    const url = `${process.env.REACT_APP_GET_MY_LISTED_NFTS_URL}${address}`;
    const response = await axios.get<ListedNFTList>(url);
    const data: ListedNFTList = response.data;
    return data;
  } catch (error) {
    console.error("Error getMyNFTListing:", error);
  }
}

/**
 * The function `getAllListing` makes an API call to retrieve a list of listed NFTs and returns the
 * data.
 * @returns The function `getAllListing` is returning a promise that resolves to a `ListedNFTList`
 * object.
 */
export const getAllListing = async () => {
  try {
    const url = `${process.env.REACT_APP_GET_ALL_LISTING_URL}?policy=all`;
    const response = await axios.get<ListedNFTList>(url);
    const data: ListedNFTList = response.data;
    return data;
  } catch (error) {
    console.error("Error getMyNFTListing:", error);
  }
}

export const getListedNFTsByPolicy = async (policyID: string) => {
  try {
    const url = `${process.env.REACT_APP_GET_ALL_LISTING_URL}?policy=${policyID}`;
    const response = await axios.get<ListedNFTList>(url);
    const data: ListedNFTList = response.data;
    return data;
  } catch (error) {
    console.error("Error getMyNFTListing:", error);
  }
}

export const getTraitsByCollectionPolicy = async (policyID: string) => {
  try {
    const url = `https://api.opencnft.io/2/collection/${[policyID]}/traits`;
    const response = await axios.get(url);
  } catch (error) {
    console.error("Error getTraitsByCollectionPolicy:", error);
  }
}


export const getCollections = () => {
  fetch('https://server.crashr.io/api/collections', {
    method: 'GET',
    headers: {
      'Authorization': `45kb-5gW-39F`,
      // Add other headers as needed
    }
  })
    .then(response => response.json())
    .then(data => console.log("getCollections", data))
    .catch(error => console.error('Error:', error));
}
