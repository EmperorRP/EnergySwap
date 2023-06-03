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

  @Post('register')
  async registerUser(@Body() body: RegisterDto) {
    return this.appService.registerUser(body.name);
  }

  @Post('becomeSeller')
  async becomeSeller() {
    return this.appService.becomeSeller();
  }

  @Get('role')
  async getUserRole() {
    return this.appService.getUserRole();
  }

  @Get('energyData')
  async getUserEnergyData() {
    return this.appService.getUserEnergyData();
  }

  @Post('addListing')
  async addListing(@Body() body: ListEnergyDto) {
    return this.appService.addListing(body.units, body.pricePerUnit);
  }

  @Post('purchase')
  async purchase(@Body() body: OfferIdDto) {
    return this.appService.purchase(body.offerId);
  }
}
