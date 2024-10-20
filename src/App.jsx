import { useState } from "react";
import { generateMnemonic } from "bip39";
import { SolanaWallet } from "./components/SolanaWallet";
import { EthWallet } from "./components/EthWallet";
import './App.css'; 

function App() {
  const [mnemonic, setMnemonic] = useState("");

  const generateSeedPhrase = async () => {
    const mn = await generateMnemonic();
    setMnemonic(mn);
  };

  return (
    <div className="app">
      <h1>Multi-Chain Wallet</h1>
      <div className="seed-section">
        <button onClick={generateSeedPhrase}>Create Seed Phrase</button>
        {/* Display seed phrase in grid format */}
        {mnemonic && (
          <div className="seed-grid">
            {mnemonic.split(" ").map((word, index) => (
              <div key={index} className="seed-word">
                {index + 1}. {word}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Display the wallets if a seed phrase is generated */}
      {mnemonic && (
        <div className="wallet-section">
          <h2>Solana Wallet</h2>
          <SolanaWallet mnemonic={mnemonic} />
          <h2>Ethereum Wallet</h2>
          <EthWallet mnemonic={mnemonic} />
        </div>
      )}
    </div>
  );
}

export default App;
