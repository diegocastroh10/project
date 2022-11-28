import { ApiProperty } from '@nestjs/swagger';

export class AuthenticateAdministratorDto {
    @ApiProperty({ example: 'mc@libertador.cl', description: 'The user email' })
    email: string;
    @ApiProperty({ example: 'mys3cr3tp4ssw0rd', description: 'The user password' })
    password: string;
}