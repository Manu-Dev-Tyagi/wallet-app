# Multi-Chain Wallet

## Overview

The Multi-Chain Wallet is a web application that allows users to generate and manage wallets for multiple blockchain networks, including Ethereum and Solana. Using a mnemonic seed phrase, users can derive multiple wallets, each with its own public and private keys.

## Features

- Generate a mnemonic seed phrase.
- Create and manage Ethereum wallets.
- Create and manage Solana wallets.
- Display public and private keys for each wallet.
- Toggle the visibility of private keys for enhanced security.

## Technologies Used

- React.js
- bip39 (for mnemonic generation and conversion)
- ethers.js (for Ethereum wallet management)
- @solana/web3.js (for Solana wallet management)
- ed25519-hd-key (for deriving Solana keys)
- tweetnacl (for cryptographic operations)

Click on the "Create Seed Phrase" button to generate a new mnemonic.
Use the generated seed phrase to create wallets for Ethereum and Solana by clicking the respective buttons.
You can view the public keys and toggle the visibility of the private keys for each wallet.
