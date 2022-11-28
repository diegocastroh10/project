import { ApiProperty } from '@nestjs/swagger';

export class CreateAdministratorDto {
    @ApiProperty({ example: 'Miguel Carrera', description: 'The user name' })
    name: string;
    @ApiProperty({ example: '18654321-4', description: 'The user rut' })
    rut: string;
    @ApiProperty({ example: 'CL', description: 'The user nation code' })
    nationality: string;
    @ApiProperty({ example: '1785/09/15', description: 'The user birthday' })
    birthday: string;
    @ApiProperty({ example: '987543265', description: 'The user phone' })
    phone: string;
    @ApiProperty({ example: 'mc@libertador.cl', description: 'The user email' })
    email: string;
    @ApiProperty({ example: 'Santiago 1785', description: 'The user address' })
    address: string;
    @ApiProperty({ example: 'mys3cr3tp4ssw0rd', description: 'The user password' })
    password: string;
}