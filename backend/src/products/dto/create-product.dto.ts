import {ApiProperty} from "@nestjs/swagger";

export class CreateProductDto {
    @ApiProperty({ example: 'Main title', description: 'The title or name' })
    title: string;
    @ApiProperty({ example: 'Brief description about this product', description: 'The description' })
    description: string;
    @ApiProperty({ example: 'USD', description: 'The coin code' })
    currency: string;
    @ApiProperty({ example: '1500', description: 'The product cost' })
    unitCost: number;
}