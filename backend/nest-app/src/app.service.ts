import { Injectable } from '@nestjs/common';
import { ethers, Contract } from 'ethers';
import * as AWS from 'aws-sdk';
import * as UserContractArtifact from './assets/UserContract.json';
import * as MarketContractArtifact from './assets/MarketContract.json';
import * as EnergyDataContractArtifact from './assets/EnergyDataContract.json';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  dynamoDb: AWS.DynamoDB.DocumentClient;

  provider: ethers.providers.JsonRpcProvider;
  signer: ethers.Signer;

  userContract: Contract;
  marketContract: Contract;
  energyDataContract: Contract;

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

    this.marketContract = new Contract(
      this.configService.get<string>('MARKET_CONTRACT_ADDRESS'), 
      MarketContractArtifact.abi, 
      this.signer
    );

    this.energyDataContract = new Contract(
      this.configService.get<string>('ENERGY_DATA_CONTRACT_ADDRESS'),
      EnergyDataContractArtifact.abi,
      this.signer
    );

    const awsAccessKeyId = this.configService.get<string>('aws_access_key_id');
    const awsSecretAccessKey = this.configService.get<string>('aws_secret_access_key');

    AWS.config.update({
      accessKeyId: awsAccessKeyId,
      secretAccessKey: awsSecretAccessKey,
      region: 'us-east-1', // replace with your region
    });

    this.dynamoDb = new AWS.DynamoDB.DocumentClient();
  }

  async becomeSeller() {
    // change the user role to Seller in the contract
    const tx = await this.userContract.becomeSeller();
    await tx.wait();

    return { message: 'Become seller successfully' };
  }

  async getUserRole() {
    // get the user's role from the contract
    const role = await this.userContract.getUserRole(this.signer.getAddress());

    return { role };
  }

  async getSellerEnergyData() {
    const params = {
      TableName: 'energyDataProduction'
    };
  
    const scanResults = await this.dynamoDb.scan(params).promise();
  
    return { productionData: scanResults.Items };
  }
  
  async getConsumerEnergyData() {
    const params = {
      TableName: 'energyDataConsumption'
    };
  
    const scanResults = await this.dynamoDb.scan(params).promise();
  
    return { consumptionData: scanResults.Items };
  }  

  async addListing(units: number, pricePerUnit: number) {
    // add a new listing to the market contract
    const tx = await this.marketContract.addListing(units, pricePerUnit);
    await tx.wait();

    return { message: 'Listing added successfully' };
  }

  async purchase(offerId: string) {
    // make a purchase from the market contract
    const tx = await this.marketContract.purchase(offerId);
    await tx.wait();

    return { message: 'Purchase successful' };
  }

  async getAllListings() {
    const listings = [];
    const listingsCount = await this.marketContract.getListingCount();
  
    for (let i = 0; i < listingsCount; i++) {
      const listing = await this.marketContract.listings(i);
      listings.push(listing);
    }
  
    return { listings };
  }  
  
}
