import { ApiProperty } from "@nestjs/swagger";

export class OfferIdDto {
  @ApiProperty({ description: 'The id of the offer.' })
  readonly offerId: string;
}
