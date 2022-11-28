import { ApiProperty } from '@nestjs/swagger';

export class DeleteProductDto {
    @ApiProperty({ example: 1, description: 'The product identification' })
    id: number;
}