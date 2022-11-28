import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductPhotosDto {
    @ApiProperty({ example: 1, description: 'The product identification' })
    id: number;
}