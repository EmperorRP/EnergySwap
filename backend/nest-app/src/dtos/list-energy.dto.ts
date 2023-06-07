// list-energy.dto.ts
import { ApiProperty } from "@nestjs/swagger";

export class ListEnergyDto {
  @ApiProperty()
  readonly amount: string;

  @ApiProperty()
  readonly price: number;
}
