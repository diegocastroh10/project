import { Controller, UseGuards, Body, UseInterceptors, UploadedFile, Param } from '@nestjs/common';
import { Headers, Post, Get, Put, Res } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiConsumes, ApiBody, ApiResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { AdministratorsService } from "./administrators.service";
import { AuthGuard} from "./administrators.guard";
import { join } from "path";
import { of } from "rxjs";

import { CreateAdministratorDto } from "./dto/create-administrator.dto";
import { AuthenticateAdministratorDto } from "./dto/authenticate-administrator.dto";
import { UpdateAdministratorPersonalDataDto} from "./dto/update-administrator-personal-data.dto";
import { UpdateAdministratorContactDataDto } from "./dto/update-administrator-contact-data.dto";
import { UpdateAdministratorPropertiesDto } from "./dto/update-administrator-properties.dto";

const Links = {

}

@Controller('administrators')
  export class AdministratorsController {
  constructor(private readonly administratorsService: AdministratorsService) {}

  @Post()
  @ApiTags('Administrator Endpoints')
  create(@Body() createAdministratorDto: CreateAdministratorDto){
    return this.administratorsService.create(createAdministratorDto);
  }

    @Post('/authenticate')
    @ApiTags('Administrator Endpoints')
    @ApiResponse({ status: 201, description: 'The user has been successfully authenticated.'})
    @ApiResponse({ status: 400, description: 'The user has not been authenticated.'})
    authenticate(@Body() authenticateAdministratorDto: AuthenticateAdministratorDto) {
        return this.administratorsService.authenticate(authenticateAdministratorDto);
    }

    @Get('/requestData')
    @ApiTags('Administrator Endpoints')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard)
    requestData(@Headers() headers){
        return this.administratorsService.requestData(headers);
    }

    @Put('/updatePersonalData')
    @ApiTags('Administrator Endpoints')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard)
    updatePersonalData(@Headers() headers, @Body() personalDataDto: UpdateAdministratorPersonalDataDto) {
        return this.administratorsService.updatePersonalData(headers, personalDataDto);
    }

    @Put('/updateContactData')
    @ApiTags('Administrator Endpoints')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard)
    updateContactData(@Headers() headers, @Body() contactDataDto: UpdateAdministratorContactDataDto) {
        return this.administratorsService.updateContactData(headers, contactDataDto);
    }

    @Put('/updatePropertiesData')
    @ApiTags('Administrator Endpoints')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard)
    updatePropertiesData(@Headers() headers, @Body() propertiesDto: UpdateAdministratorPropertiesDto) {
        return this.administratorsService.updatePropertiesData(headers, propertiesDto);
    }

    @Put('/updatePhoto')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @ApiTags('Administrator Endpoints')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    updatePhoto(@Headers() headers, @UploadedFile() file: Express.Multer.File) {
        try{
            console.log(file)
            if(file.mimetype.split('/')[0]==='image'){
                if(file.size < 500000){
                    return this.administratorsService.updatePhoto(headers, file);
                }
                else {
                    return ({
                        error: "El archivo excede tamaño máximo permitido"
                    })
                }
            }
            else {
                return ({
                    error: "El archivo no es una foto"
                })
            }
        }
        catch (error) {
            console.log(error())
            return(error)
        }
    }

    @Get('/getPhoto/:filename')
    @ApiTags('Administrator Endpoints')
    getPhoto(@Param('filename') filename: string, @Res() res){
        return of (res.sendFile(join(process.cwd(), './uploads/'+filename)));
    }
}