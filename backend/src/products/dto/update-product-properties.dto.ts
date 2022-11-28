import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductPropertiesDto {
    @ApiProperty({ example: 1, description: 'The product identification' })
    id: number;
    @ApiProperty({ example: '{"description": "My description"}', description: 'The product properties' })
    properties: string;
}