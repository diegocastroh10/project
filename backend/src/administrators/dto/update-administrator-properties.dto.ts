import { ApiProperty } from '@nestjs/swagger';

export class UpdateAdministratorPropertiesDto {
    @ApiProperty({ example: '{"key": "value"}', description: 'The user properties in JSON object' })
    properties: string;
}