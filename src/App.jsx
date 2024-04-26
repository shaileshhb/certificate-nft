import { useEffect, useState } from "react";
import "./App.css";
import config from "./utils/config.json";
import Certificate from "./utils/Certificate.json";
import { ethers } from "ethers";

function App() {
  const [currentAccount, setCurrentAccount] = useState(null);

  const connectWallet = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!!!!");
      return;
    }

    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    console.log(accounts);
    setCurrentAccount(accounts[0]);
  };

  // const getChainID = async (ethereum) => {
  //   const chainID = await ethereum.request({ method: "eth_chainId" });
  //   console.log("connected to chain", chainID);
  //   return chainID;
  // };

  const checkIfConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!!!!");
      return;
    }

    // Check if we're authorized to acccess user's wallet
    const accounts = await ethereum.request({ method: "eth_accounts" });
    console.log(accounts);

    if (accounts.length !== 0) {
      console.log("Found authorized account -> ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } else {
      console.log("Authorized account not found!!!");
    }
  };

  const mintCertificate = async () => {
    const connectedContract = await getCertificateContract();
    try {
      const transaction = await connectedContract.issueCertificate();
      await transaction.wait();
      console.log(connectedContract.address);
      getCertificateCount();
    } catch (error) {
      console.error(error);
    }
  };

  const getCertificateCount = async () => {
    const connectedContract = await getCertificateContract();
    const count = await connectedContract.getTotalCertificatesMinted();
    console.log(count);
  };

  const getCertificateContract = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!!!!");
      return;
    }

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const network = await provider.getNetwork();

    const connectedContract = new ethers.Contract(
      config[network.chainId].Certificate.address,
      Certificate.abi,
      signer
    );

    return connectedContract;
  };

  useEffect(() => {
    checkIfConnected();
  }, []);

  return (
    <>
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">My NFT Certificates</p>
        </div>
      </div>

      {currentAccount ? (
        <div>
          <h3>{currentAccount}</h3>
          <button
            type="button"
            className="mint-button"
            onClick={mintCertificate}
          >
            Mint Certificate
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={connectWallet}
          className="cta-button connect-wallet-button"
        >
          Connect wallet
        </button>
      )}
    </>
  );
}

export default App;
