import { useState } from "react";
import { mnemonicToSeedSync } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";

export const EthWallet = ({ mnemonic }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wallets, setWallets] = useState([]);
  const [showPrivateKey, setShowPrivateKey] = useState([]);

  const addWallet = async () => {
    const seed = mnemonicToSeedSync(mnemonic); // Sync function for simplicity
    const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(derivationPath);
    const wallet = new Wallet(child.privateKey);
    setCurrentIndex(currentIndex + 1);
    setWallets([...wallets, { address: wallet.address, privateKey: wallet.privateKey }]);
    setShowPrivateKey([...showPrivateKey, false]);
  };

  const toggleShowPrivateKey = (index) => {
    setShowPrivateKey(
      showPrivateKey.map((val, idx) => (idx === index ? !val : val))
    );
  };

  return (
    <div>
      <button onClick={addWallet}>Add ETH Wallet</button>
      {wallets.map((wallet, index) => (
        <div key={index} className="wallet-box">
          <p>Address: {wallet.address}</p>
          <p>
            Private Key:{" "}
            <input
              type={showPrivateKey[index] ? "text" : "password"}
              value={wallet.privateKey}
              readOnly
            />
            <button onClick={() => toggleShowPrivateKey(index)}>
              {showPrivateKey[index] ? "Hide" : "Show"}
            </button>
          </p>
        </div>
      ))}
    </div>
  );
};
