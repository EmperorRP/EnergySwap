import { ApiProperty } from "@nestjs/swagger";

export class OfferIdDto {
  @ApiProperty()
  readonly offerId: number;
}