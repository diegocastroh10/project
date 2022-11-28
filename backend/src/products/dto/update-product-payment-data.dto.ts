import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductPaymentDataDto {
    @ApiProperty({ example: 1, description: 'The product identification' })
    id: number;
    @ApiProperty({ example: 'USD', description: 'The coin code' })
    currency: string;
    @ApiProperty({ example: '1500', description: 'The service cost' })
    unitCost: number;
}