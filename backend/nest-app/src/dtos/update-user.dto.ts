// update-user.dto.ts
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {
  @ApiProperty()
  readonly name: string;
  
  @ApiProperty()
  readonly status: number;
}
