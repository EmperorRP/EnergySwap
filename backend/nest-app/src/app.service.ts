import { Injectable } from '@nestjs/common';
import { Contract, ethers } from 'ethers';
import * as UserContractArtifact from './assets/UserContract.json';
import * as TradingContractArtifact from './assets//TradingContract.json';
import * as EnergyTokenArtifact from './assets//EnergyToken.json';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  provider: ethers.providers.JsonRpcProvider;
  signer: ethers.Signer;

  userContract: Contract;
  tradingContract: Contract;
  energyToken: Contract;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('INFURA_API_KEY');
    this.provider = new ethers.providers.InfuraProvider('sepolia', apiKey);

    const privateKey = this.configService.get<string>('PRIVATE_KEY');
    this.signer = new ethers.Wallet(privateKey).connect(this.provider);

    this.userContract = new Contract(
      this.configService.get<string>('USER_CONTRACT_ADDRESS'), 
      UserContractArtifact.abi, 
      this.signer
    );

    this.tradingContract = new Contract(
      this.configService.get<string>('TRADING_CONTRACT_ADDRESS'), 
      TradingContractArtifact.abi, 
      this.signer
    );

    this.energyToken = new Contract(
      this.configService.get<string>('ENERGY_TOKEN_ADDRESS'),
      EnergyTokenArtifact.abi,
      this.signer
    );
  }

  async registerUser(name: string, status: number) {
    if (!name || status === undefined) {
      throw new Error('Name or status is undefined');
    }
    const tx = await this.userContract.register(name, status);
    await tx.wait();
    return tx.hash;
  }

  async updateUserDetails(name: string, status: number) {
    // Check if name or status is undefined
    if (!name || status === undefined) {
      throw new Error('Name or status is undefined');
    }

    const tx = await this.userContract.updateDetails(name, status);
    await tx.wait();
    return tx.hash;
  }

  async getUserDetails(userAddress: string) {
    const details = await this.userContract.getDetails(userAddress);
    return details;
  }

  async listEnergy(amount: string, price: number) {
    const weiAmount = ethers.utils.parseEther(amount);
    const tx = await this.tradingContract.listEnergy(weiAmount, price); // amount should be in ETH value
    await tx.wait();
    return tx.hash;
  }

  async buyEnergy(offerId: number) {
    const tx = await this.tradingContract.buyEnergy(offerId);
    await tx.wait();
    return tx.hash;
  }

  async cancelTrade(offerId: number) {
    const tx = await this.tradingContract.cancelTrade(offerId);
    await tx.wait();
    return tx.hash;
  }

  async getAllOffers() {
    const offers = await this.tradingContract.getAllOffers();
    return offers;
  }

  async getOffer(offerId: number) {
    const offer = await this.tradingContract.getOffer(offerId);
    return offer;
  }
}
