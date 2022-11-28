import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { ProductModel } from "./models/product.model";
import { ReasonPhrases, StatusCodes }from 'http-status-codes';
import * as jose from 'jose';

import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductGeneralDataDto } from "./dto/update-product-general-data.dto";
import { UpdateProductPaymentDataDto } from "./dto/update-product-payment-data.dto";
import { UpdateProductPropertiesDto } from "./dto/update-product-properties.dto";
import { UpdateProductPhotosDto } from "./dto/update-product-photos.dto";
import { DeleteProductDto } from "./dto/delete-product.dto";

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(ProductModel)
        private readonly productModel: typeof ProductModel,
    ) {}

    async create(createProductDto: CreateProductDto, headers){
        try {
            const jwt = headers['authorization'].split(" ")[1];
            const secret = await new TextEncoder().encode(
                "Swe4g7c?UBm5Nrd96vhsVDtkyJFbqKMTm!TMw5BDRLtaCFAXNvbq?s4rGKQSZnUP"
            );
            const { payload } = await jose.jwtVerify(jwt, secret);
            const properties = {}
            const product = await this.productModel.create({
                title: createProductDto.title,
                description: createProductDto.description,
                currency: createProductDto.currency,
                unitCost: createProductDto.unitCost,
                administratorId: payload.id,
                properties: properties,
            })
            return ({
                status: StatusCodes.CREATED,
                send: ReasonPhrases.CREATED,
                data: {
                    title: product.title
                }
            })
        }
        catch (error) {
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

    async requestProducts(headers){
        try {
            const jwt = headers['authorization'].split(" ")[1];
            const secret = await new TextEncoder().encode(
                "Swe4g7c?UBm5Nrd96vhsVDtkyJFbqKMTm!TMw5BDRLtaCFAXNvbq?s4rGKQSZnUP"
            );
            const { payload } = await jose.jwtVerify(jwt, secret);
            const products = await this.productModel.findAll({
                where: {administratorId: payload.id}
            })
            return ({
                status: StatusCodes.OK,
                send: ReasonPhrases.OK,
                data: products
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

    async updateGeneralData(generalDataDto:UpdateProductGeneralDataDto){
        try {
            const product = await this.productModel.findOne({
                where: {id: generalDataDto.id}
            });
            await product.update({
                title: generalDataDto.title,
                description: generalDataDto.description,
            })
            await product.save();
            return ({
                status: StatusCodes.OK,
                send: ReasonPhrases.OK,
                data: {
                    message: "Información general actualizada",
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

    async updatePaymentData(paymentDataDto:UpdateProductPaymentDataDto){
        try {
            const product = await this.productModel.findOne({
                where: {id: paymentDataDto.id}
            });
            await product.update({
                currency: paymentDataDto.currency,
                unitCost: paymentDataDto.unitCost,
            })
            await product.save();
            return ({
                status: StatusCodes.OK,
                send: ReasonPhrases.OK,
                data: {
                    message: "Información de pago actualizada",
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

    async updatePropertiesData(propertiesDto:UpdateProductPropertiesDto){
        try {
            const product = await this.productModel.findOne({
                where: {id: propertiesDto.id}
            });
            await product.update({
                properties: propertiesDto.properties,
            })
            await product.save();
            return ({
                status: StatusCodes.OK,
                send: ReasonPhrases.OK,
                data: {
                    message: "Propiedades de producto actualizadas",
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

    async updateProductPhotos(photosDto:UpdateProductPhotosDto, files:string[]){
        try {
            const product = await this.productModel.findOne({
                where: {id: photosDto.id}
            })
            const properties = product.properties;
            properties["photos"] = files;
            await product.update({
                properties: JSON.stringify(properties),
            });
            await product.save();
            return ({
                status: StatusCodes.OK,
                send: ReasonPhrases.OK,
                data: {
                    message: "Fotos de producto actualizadas",
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

    async delete(deleteProductDto:DeleteProductDto){
        try {
            const product = await this.productModel.findOne({
                where: {id: deleteProductDto.id}
            })
            await product.destroy();
            return ({
                status: StatusCodes.GONE,
                send: ReasonPhrases.GONE,
                data: {
                    message: "Producto eliminado",
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
