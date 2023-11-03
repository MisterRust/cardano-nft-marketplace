import { createContext, PropsWithChildren, useState, useEffect, useContext } from 'react';
import { Blockfrost, Lucid, WalletApi } from 'lucid-cardano';
import { useLocalStorage } from 'react-use';
import axios from 'axios';

interface WalletConnectContextValues {
  api: WalletApi | null;
  lucid: Lucid | null;
  activeWallet: string;
  accumulating: boolean;
  myWalletAddress: string;
  enableWallet: (name: string) => Promise<void> | void;
  disableWalletAddress: () => Promise<void> | void;
  setMyWalletAddress: (newValue: string) => void;
}

export const WalletConnectContext = createContext<WalletConnectContextValues>({
  api: null,
  lucid: null,
  activeWallet: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  enableWallet: () => { },
  myWalletAddress: '',
  accumulating: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  disableWalletAddress: () => { },
  setMyWalletAddress: () => { },
});

export const WalletConnectProvider = ({ children }: PropsWithChildren) => {
  const [api, setApi] = useState<WalletApi | null>(null);
  const [lucid, setLucid] = useState<Lucid | null>(null);
  const [accumulating, setAccumulating] = useState(false);
  const [myWalletAddress, setMyWalletAddress] = useState<string>();

  const [activeWalletName, setActiveWalletName] = useLocalStorage('active-wallet-name', '');

  const disableWalletAddress = () => {
    setMyWalletAddress('');
    setActiveWalletName('');
  };

  const enableWallet = async (name: string) => {
    const api = await window.cardano[name].enable();
    const blockfrost_api = await axios.get("https://l1bojqdfq5.execute-api.us-west-2.amazonaws.com/apis")
    const newLucid = await Lucid.new(
      new Blockfrost(
        "https://cardano-mainnet.blockfrost.io/api/v0",
        blockfrost_api.data.api
      ),
      "Mainnet"
    );
    newLucid.selectWallet(api);
    setApi(api);
    setActiveWalletName(name);
    setLucid(newLucid);
    
    const my_wallet_address = await newLucid.wallet.address();
    // const my_wallet_address = "addr1qx6t9lekhxce25xvfwe6quwl95u4vqmdk3j43zjyvzxj9p7ksjdge25uu0v80msy0a4vakla928d4dsssd0796ga2guqckmhgg"



    setMyWalletAddress(my_wallet_address);

  };
  useEffect(() => {
    const initializeWallet = async () => {
      if (activeWalletName) {
        const isEnabled = await window.cardano[activeWalletName].isEnabled();

        if (isEnabled) {
          enableWallet(activeWalletName);
        }
      }
    };

    initializeWallet();
  }, [activeWalletName]);


  return (
    <WalletConnectContext.Provider
      value={{
        api,
        lucid,
        activeWallet: activeWalletName ?? '',
        enableWallet,
        accumulating,
        myWalletAddress,
        disableWalletAddress,
        setMyWalletAddress
      }}
    >
      {children}
    </WalletConnectContext.Provider>
  );
};

export const useWalletConnect = () => useContext(WalletConnectContext);