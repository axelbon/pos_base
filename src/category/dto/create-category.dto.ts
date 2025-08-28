import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {

    @ApiProperty({example: 'Soup', description: 'Category name'})
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({example: 'Instant soup boul', description: 'Category description'})
    @IsString()
    description: string;

    @ApiProperty({example: true, description: 'Is active', required: false})
    @IsBoolean()
    is_active?: boolean;


}
