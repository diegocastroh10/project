import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductGeneralDataDto {
  @ApiProperty({ example: 1, description: 'The product identification' })
  id: number;
  @ApiProperty({ example: 'Main title', description: 'The title' })
  title: string;
  @ApiProperty({ example: 'Brief description', description: 'The description' })
  description: string;
}
