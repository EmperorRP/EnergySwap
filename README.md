# EnergySwap


<br/>
<p align="center">
  <a href=#>
    <img src="frontend/public/Logo.svg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">EnergySwap</h3>

  <p align="center">
    P2P Energy trading platform built on top of Ethereum and Chainlink
    <br/>
    <br/>
  </p>
</p>

![Downloads](https://img.shields.io/github/downloads/ShaanCoding/ReadME-Generator/total) ![Contributors](https://img.shields.io/github/contributors/ShaanCoding/ReadME-Generator?color=dark-green) ![Issues](https://img.shields.io/github/issues/ShaanCoding/ReadME-Generator) ![License](https://img.shields.io/github/license/ShaanCoding/ReadME-Generator) 

## Table Of Contents

* [About the Project](#about-the-project)
* [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Authors](#authors)
* [Acknowledgements](#acknowledgements)

## Problem Statement

The current energy market is characterized by centralization, a lack of transparency, and limited accessibility. Consumers have limited visibility into the sources of their power and few options for controlling their consumption. Furthermore, producers of renewable energy have limited opportunities to sell their surplus energy back to the grid. This system limits the adoption of renewable energy sources and inhibits innovation in the energy sector.

## Solution

EnergySwap is a decentralized, peer-to-peer energy trading platform leveraging blockchain and IoT technology. Our solution allows for transparent, direct trading of energy between producers and consumers. Producers can sell their excess energy directly to other users, allowing for increased revenue streams and promoting the use of renewable energy. Consumers gain the ability to choose their energy sources and control their consumption more directly.

## Target Market

Our initial target market includes owners of residential solar power installations and electric vehicle charging stations. These individuals are likely to produce excess energy that they could sell on our platform. We will also target eco-conscious consumers who are interested in purchasing green energy directly from these local producers.

On a broader scale, we aim to target all energy consumers and producers, as we believe our platform provides advantages for everyone by creating a more open and efficient energy market.

## Objective/Goal

Our primary goal is to disrupt the traditional energy market by providing a decentralized and transparent platform for energy trading. We aim to achieve a significant share of the energy trading market within our target demographic within the first five years.

In doing so, we hope to promote the adoption of renewable energy sources, improve energy efficiency, and contribute to sustainability. We measure our success not just in terms of market share and revenue, but also in terms of our impact on the environment and society.

## Built With

![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Arduino](https://img.shields.io/badge/-Arduino-00979D?style=for-the-badge&logo=Arduino&logoColor=white)
![Chainlink](https://img.shields.io/badge/Chainlink-375BD2?style=for-the-badge&logo=Chainlink&logoColor=white)
![Chart.js](https://img.shields.io/badge/chart.js-F5788D.svg?style=for-the-badge&logo=chart.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Remix](https://img.shields.io/badge/remix-%23000.svg?style=for-the-badge&logo=remix&logoColor=white)
![Solidity](https://img.shields.io/badge/Solidity-%23363636.svg?style=for-the-badge&logo=solidity&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

Follow these prerequisites to get your local copy all set up.

#### Backend
- change directory to backend
```sh
cd backend/
```
- change directory to nest-app
```sh
cd nest-app/
```
- add a .env file with the following and add in your respective keys
```sh
PRIVATE_KEY= <enter your private key>
INFURA_API_KEY= <enter your private infura api key>
USER_CONTRACT_ADDRESS=0x9970aDd8bAf8a071395D4932B8Cd9C13ef2e3544
MARKET_CONTRACT_ADDRESS=0x1F6D603a28e00DFc5C5b03b81a5f2797FdF36C97
ENERGY_DATA_CONTRACT_ADDRESS=0xc6aaDEc9238CDC375129B38a81332B18DF1515ae
OPERATOR_ADDRESS=0xec39A0C27b4E7F6c5a02F6AA52F7153Cf8C210f1
aws_access_key_id= <enter your private aws access key>
aws_secret_access_key= <enter your private aws secret access key>
```
- install required packages using npm
```sh
npm i
```
- run the backend server
```sh
npm run start:dev
```

#### Frontend
- change directory to frontend
```sh
cd frontend/
```
- install required packages using npm
```sh
npm i
```
- run the frontend
```sh
npm run dev
```

### Installation

1. Clone the repo to your local machine

```sh
git clone https://github.com/EmperorRP/EnergySwap.git
```

## Usage

EnergySwap enables users in a locality to exchange energy(electricity) amongst each other through their local grid hence making it a peer to peer electricity exchange.

User flow for seller/producer/prosumer: Electricity gets produced by the producer at his unit(house). Then it is sent to the local grid from which it can reach the buyers.

User flow for buyer: Buyer goes to the listings page and buys energy immediately from the seller they want. The grid is notified and makes sure to allot that much electricity to the buyer's house.

![EnergySwap](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjZjMmM2Yzk0NWVlZGEwYTg0M2MxOWQ0YmVhNDMzNDY1ZTg4NjQ4MiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/B2AKBVfgc4XjjsXkuv/giphy.gif)

## Authors

* **Nevan D'Souza** - [Nevan D'Souza](https://github.com/nevan-dsouza/)
* **Rahul Pujari** - [Rahul Pujari](https://github.com/EmperorRP/)

## Acknowledgements
* [IRENA P2P Trading Doc](https://www.irena.org/-/media/Files/IRENA/Agency/Publication/2020/Jul/IRENA_Peer-to-peer_electricity_trading_2020.pdf?la=en&hash=AB7E0CFED5A51CFD75EB2CC1FB635B64329BB439)

