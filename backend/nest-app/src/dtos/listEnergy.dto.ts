
import { ApiProperty } from "@nestjs/swagger";

export class ListEnergyDto {
  @ApiProperty({ description: 'The amount of energy to be listed in units. This should be a string representation of the numeric value.' })
  readonly units: number;

  @ApiProperty({ description: 'The price per unit of energy.' })
  readonly pricePerUnit: number;
}