import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateBrandDto {

    @ApiProperty({example: 'Ford', description: 'Brand name'})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({example: 'Ford company', description: 'Brand description'})
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({example: true, description: 'Is active', required: false})
    @IsBoolean()
    @IsOptional()
    is_active?: boolean;

}
