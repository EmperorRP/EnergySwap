import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { RegisterDto } from './dtos/register.dto';
import { ListEnergyDto } from './dtos/listEnergy.dto';
import { TradeDto } from './dtos/trade.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { OfferIdDto } from './dtos/offer-id.dto';

@Controller('user')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('becomeSeller')
  async becomeSeller() {
    return this.appService.becomeSeller();
  }

  @Get('role')
  async getUserRole() {
    return this.appService.getUserRole();
  }

  @Get('energyData/seller')
  async getSellerEnergyData() {
    return this.appService.getSellerEnergyData();
  }

  @Get('energyData/consumer')
  async getConsumerEnergyData() {
    return this.appService.getConsumerEnergyData();
  }

  @Post('addListing')
  async addListing(@Body() body: ListEnergyDto) {
    return this.appService.addListing(body.units, body.pricePerUnit);
  }

  @Get('listings')
  async getAllListings() {
    return this.appService.getAllListings();
  }


  @Post('purchase')
  async purchase(@Body() body: OfferIdDto) {
    return this.appService.purchase(body.offerId);
  }
}
