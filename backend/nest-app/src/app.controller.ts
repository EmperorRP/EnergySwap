import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { RegisterDto } from './dtos/register.dto';
import { ListEnergyDto } from './dtos/listEnergy.dto';
import { TradeDto } from './dtos/trade.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { OfferIdDto } from './dtos/offer-id.dto';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('register')
  async registerUser(@Body() body: RegisterDto) {
    return this.appService.registerUser(body.name, body.status);
  }

  @Post('update')
  async updateUserDetails(@Body() body: UpdateUserDto) {
    return this.appService.updateUserDetails(body.name, body.status);
  }

  @Get('user/:address')
  async getUserDetails(@Param('address') address: string) {
    return this.appService.getUserDetails(address);
  }

  @Post('list')
  async listEnergy(@Body() body: ListEnergyDto) {
    return this.appService.listEnergy(body.amount, body.price);
  }

  @Post('buy-energy')
  async buyEnergy(@Body() body: OfferIdDto) {
    return this.appService.buyEnergy(body.offerId);
  }

  // @Post('cancel-trade')
  // async cancelTrade(@Body() body: OfferIdDto) {
  //   return this.appService.cancelTrade(body.offerId);
  // }

  @Get('all-offers')
  async getAllOffers() {
    return this.appService.getAllOffers();
  }

  @Get('offer/:offerId')
  async getOffer(@Param('offerId') offerId: number) {
    return this.appService.getOffer(offerId);
  }
}
