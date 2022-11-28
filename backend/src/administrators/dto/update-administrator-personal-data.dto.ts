import { ApiProperty } from '@nestjs/swagger';

export class UpdateAdministratorPersonalDataDto {
    @ApiProperty({ example: 'Bernardo Higgins', description: 'The new user name' })
    name: string;
    @ApiProperty({ example: '18654321-4', description: 'The new user rut' })
    rut: string;
    @ApiProperty({ example: 'PE', description: 'The new user nation code' })
    nationality: string;
    @ApiProperty({ example: '1785/09/15', description: 'The new user birthday' })
    birthday: string;
}