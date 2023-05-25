import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto{
    @ApiProperty()
    readonly name: string;
    @ApiProperty()
    readonly status: number;
}
