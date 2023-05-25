import { ApiProperty } from "@nestjs/swagger";

export class TradeDto {
    @ApiProperty()
    readonly offerId: number;
}
