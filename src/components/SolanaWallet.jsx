import { useState } from "react";
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";

export function SolanaWallet({ mnemonic }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wallets, setWallets] = useState([]);
  const [showPrivateKey, setShowPrivateKey] = useState([]);

  const addWallet = () => {
    const seed = mnemonicToSeedSync(mnemonic); // Sync function for simplicity
    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);
    setCurrentIndex(currentIndex + 1);
    setWallets([...wallets, { publicKey: keypair.publicKey, secretKey: secret }]);
    setShowPrivateKey([...showPrivateKey, false]);
  };

  const toggleShowPrivateKey = (index) => {
    setShowPrivateKey(
      showPrivateKey.map((val, idx) => (idx === index ? !val : val))
    );
  };

  return (
    <div>
      <button onClick={addWallet}>Add Solana Wallet</button>
      {wallets.map((wallet, index) => (
        <div key={index} className="wallet-box">
          <p>Public Key: {wallet.publicKey.toBase58()}</p>
          <p>
            Private Key:{" "}
            <input
              type={showPrivateKey[index] ? "text" : "password"}
              value={Buffer.from(wallet.secretKey).toString("hex")}
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
}
