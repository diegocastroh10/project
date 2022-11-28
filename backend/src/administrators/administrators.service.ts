import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { AdministratorModel } from "./models/administrator.model";
import { ReasonPhrases, StatusCodes }from 'http-status-codes';
import * as bcrypt from 'bcrypt';
import * as jose from 'jose';

import { CreateAdministratorDto } from "./dto/create-administrator.dto";
import { AuthenticateAdministratorDto } from "./dto/authenticate-administrator.dto";
import { UpdateAdministratorPersonalDataDto} from "./dto/update-administrator-personal-data.dto";
import { UpdateAdministratorContactDataDto } from "./dto/update-administrator-contact-data.dto";
import { UpdateAdministratorPropertiesDto } from "./dto/update-administrator-properties.dto";

@Injectable()
export class AdministratorsService {
    constructor(
        @InjectModel(AdministratorModel)
        private readonly administratorModel: typeof AdministratorModel,
    ) {}

    async create(createAdministratorDto: CreateAdministratorDto){
        try{
            const salt = await bcrypt.genSalt();
            const password = createAdministratorDto.password;
            const hash = await bcrypt.hash(password, salt);
            const properties = {};
            const provider = await this.administratorModel.create({
                name: createAdministratorDto.name,
                rut: createAdministratorDto.rut,
                email: createAdministratorDto.email,
                phone: createAdministratorDto.phone,
                nationality: createAdministratorDto.nationality,
                address: createAdministratorDto.address,
                birthday: createAdministratorDto.birthday,
                password: hash,
                properties: properties
            })
            return ({
                status: StatusCodes.CREATED,
                send: ReasonPhrases.CREATED,
                data: {
                    email: provider.email
                }
            })
        }
        catch (error) {
            console.log(error.name);
            if (error.name === 'SequelizeUniqueConstraintError'){
                return ({
                    status: StatusCodes.BAD_REQUEST,
                    send: ReasonPhrases.BAD_REQUEST,
                    data: {
                        error: error.toString(),
                        message: error.parent.detail,
                    }
                })
            }
            else if (error.name === 'SequelizeValidationError'){
                return ({
                    status: StatusCodes.BAD_REQUEST,
                    send: ReasonPhrases.BAD_REQUEST,
                    data: {
                        error: error.toString(),
                        message: error.errors[0].path+" no puede estar vacío",
                    }
                })
            }
            else {
                return ({
                    status: StatusCodes.INTERNAL_SERVER_ERROR,
                    send: ReasonPhrases.INTERNAL_SERVER_ERROR,
                    data: {
                        error: error.toString(),
                        message: error.message,
                    }
                })
            }
        }
    }

    async authenticate(authenticateAdministratorDto: AuthenticateAdministratorDto){
        try {
            const account = await this.administratorModel.findOne({
                where: {email: authenticateAdministratorDto.email},
            });
            if (account) {
                const isMatch = await bcrypt.compare(authenticateAdministratorDto.password, account.password);
                if (isMatch) {
                    const secret = await new TextEncoder().encode(
                        "Swe4g7c?UBm5Nrd96vhsVDtkyJFbqKMTm!TMw5BDRLtaCFAXNvbq?s4rGKQSZnUP"
                    );

                    const jwt = await new jose.SignJWT({
                        id: account.id,
                        name: account.name,
                        rut: account.rut,
                        nationality: account.nationality,
                        birthday: account.birthday,
                        email: account.email,
                        phone: account.phone,
                        address: account.address,
                        properties: account.properties,
                    })
                        .setProtectedHeader({ alg: "HS256" })
                        .setExpirationTime('2h')
                        .sign(secret);

                    console.log("JWT", jwt);

                    return ({
                        status: StatusCodes.OK,
                        send: ReasonPhrases.OK,
                        data: {
                            message: "Usuario autenticado",
                            token: jwt
                        }
                    })
                }
                else {
                    console.log("CONTRASEÑA")
                    return ({
                        status: StatusCodes.BAD_REQUEST,
                        send: ReasonPhrases.BAD_REQUEST,
                        data: {
                            error: "Contraseña incorrecta",
                        }
                    })
                }
            }
            else {
                console.log("NO ENCONTRADO")
                return ({
                    status: StatusCodes.BAD_REQUEST,
                    send: ReasonPhrases.BAD_REQUEST,
                    data: {
                        error: "Usuario no encontrado   ",
                    }
                })
            }
        }
        catch (error) {
            console.log(error);
            return ({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                send: ReasonPhrases.INTERNAL_SERVER_ERROR,
                data: {
                    error: error.toString(),
                    message: error.message,
                }
            })
        }
    }

    async requestData(headers){
        try {
            const jwt = headers['authorization'].split(" ")[1];
            const secret = await new TextEncoder().encode(
                "Swe4g7c?UBm5Nrd96vhsVDtkyJFbqKMTm!TMw5BDRLtaCFAXNvbq?s4rGKQSZnUP"
            );
            const { payload } = await jose.jwtVerify(jwt, secret);
            const account = await this.administratorModel.findOne({
                where: {id: payload.id},
            });
            const client = {
                id: account.id,
                name: account.name,
                rut: account.rut,
                nationality: account.nationality,
                birthday: account.birthday,
                email: account.email,
                phone: account.phone,
                address: account.address,
                properties: account.properties,
            }
            return ({
                status: StatusCodes.OK,
                send: ReasonPhrases.OK,
                data: client
            })
        }
        catch (error) {
            return ({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                send: ReasonPhrases.INTERNAL_SERVER_ERROR,
                data: {
                    error: error.toString(),
                    message: error.message,
                }
            })
        }
    }

    async updatePersonalData(headers, personalDataDto: UpdateAdministratorPersonalDataDto){
        try{
            const jwt = headers['authorization'].split(" ")[1];
            const secret = await new TextEncoder().encode(
                "Swe4g7c?UBm5Nrd96vhsVDtkyJFbqKMTm!TMw5BDRLtaCFAXNvbq?s4rGKQSZnUP"
            );
            const { payload } = await jose.jwtVerify(jwt, secret);
            const client = await this.administratorModel.findOne({
                where: {id: payload.id},
            });
            await client.update({
                name: personalDataDto.name,
                rut: personalDataDto.rut,
                nationality: personalDataDto.nationality,
                birthday: personalDataDto.birthday,
            })
            await client.save();
            return ({
                status: StatusCodes.OK,
                send: ReasonPhrases.OK,
                data: {
                    message: "Información personal actualizada",
                }
            })
        }
        catch (error) {
            return ({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                send: ReasonPhrases.INTERNAL_SERVER_ERROR,
                data: {
                    error: error.toString(),
                    message: error.message,
                }
            })
        }
    }

    async updateContactData(headers, contactDataDto: UpdateAdministratorContactDataDto){
        try{
            const jwt = headers['authorization'].split(" ")[1];
            const secret = await new TextEncoder().encode(
                "Swe4g7c?UBm5Nrd96vhsVDtkyJFbqKMTm!TMw5BDRLtaCFAXNvbq?s4rGKQSZnUP"
            );
            const { payload } = await jose.jwtVerify(jwt, secret);
            const client = await this.administratorModel.findOne({
                where: {id: payload.id},
            });
            await client.update({
                email: contactDataDto.email,
                phone: contactDataDto.phone,
                address: contactDataDto.address,
            })
            await client.save();
            return ({
                status: StatusCodes.OK,
                send: ReasonPhrases.OK,
                data: {
                    message: "Información de contacto actualizada",
                }
            })
        }
        catch (error) {
            return ({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                send: ReasonPhrases.INTERNAL_SERVER_ERROR,
                data: {
                    error: error.toString(),
                    message: error.message,
                }
            })
        }
    }

    async updatePropertiesData(headers, propertiesDto: UpdateAdministratorPropertiesDto){
        try{
            const jwt = headers['authorization'].split(" ")[1];
            const secret = await new TextEncoder().encode(
                "Swe4g7c?UBm5Nrd96vhsVDtkyJFbqKMTm!TMw5BDRLtaCFAXNvbq?s4rGKQSZnUP"
            );
            const { payload } = await jose.jwtVerify(jwt, secret);
            const client = await this.administratorModel.findOne({
                where: {id: payload.id},
            });
            await client.update({
                properties: propertiesDto.properties,
            })
            await client.save();
            return ({
                status: StatusCodes.OK,
                send: ReasonPhrases.OK,
                data: {
                    message: "Propiedades de usuario actualizadas",
                }
            })
        }
        catch (error) {
            return ({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                send: ReasonPhrases.INTERNAL_SERVER_ERROR,
                data: {
                    error: error.toString(),
                    message: error.message,
                }
            })
        }
    }

    async updatePhoto(headers, file){
        try{
            const jwt = headers['authorization'].split(" ")[1];
            const secret = await new TextEncoder().encode(
                "Swe4g7c?UBm5Nrd96vhsVDtkyJFbqKMTm!TMw5BDRLtaCFAXNvbq?s4rGKQSZnUP"
            );
            const { payload } = await jose.jwtVerify(jwt, secret);
            const fs = require("fs");
            const path = './uploads/administrator_'+payload.id+'_'+file.originalname;
            fs.writeFile(path, file.buffer, (err) => {
                if (err) throw err;
            });
            const client = await this.administratorModel.findOne({
                where: {id: payload.id},
            });
            const properties = client.properties;
            properties["photo"] = 'administrator_'+payload.id+'_'+file.originalname;
            await client.update({
                properties: JSON.stringify(properties),
            });
            await client.save();
            return ({
                status: StatusCodes.OK,
                send: ReasonPhrases.OK,
                data: {
                    message: "Foto de perfil actualizada",
                }
            })
        }
        catch (error) {
            return ({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                send: ReasonPhrases.INTERNAL_SERVER_ERROR,
                data: {
                    error: error.toString(),
                    message: error.message,
                }
            })
        }
    }

}
