import { ApiProperty } from '@nestjs/swagger';

export class UpdateAdministratorContactDataDto {
    @ApiProperty({ example: 'andino@libertador.cl', description: 'The new user email' })
    email: string;
    @ApiProperty({ example: '95184632', description: 'The new user phone' })
    phone: string;
    @ApiProperty({ example: 'Lima 1790', description: 'The new user address' })
    address: string;
}