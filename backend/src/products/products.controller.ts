import { Controller, UseGuards, UseInterceptors, UploadedFiles, Body, Param, Res } from '@nestjs/common';
import { Headers, Post, Get, Put, Delete } from '@nestjs/common';
import {ApiTags, ApiBearerAuth, ApiConsumes, ApiBody} from "@nestjs/swagger";
import { FilesInterceptor } from '@nestjs/platform-express';

import { ProductsService } from "./products.service";
import { AccessGuard } from "./products.guard";
import { of } from "rxjs";
import { join } from "path";

import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductGeneralDataDto } from "./dto/update-product-general-data.dto";
import { UpdateProductPaymentDataDto } from "./dto/update-product-payment-data.dto";
import { UpdateProductPropertiesDto } from "./dto/update-product-properties.dto";
import { UpdateProductPhotosDto } from "./dto/update-product-photos.dto";
import { DeleteProductDto } from "./dto/delete-product.dto";

@Controller('/products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    @ApiTags('Product Endpoints')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(AccessGuard)
    create(@Body() createProductDto: CreateProductDto, @Headers() headers){
        return this.productsService.create(createProductDto, headers);
    }

    @Get('/requestProducts')
    @ApiTags('Product Endpoints')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(AccessGuard)
    requestServices(@Headers() headers){
        return this.productsService.requestProducts(headers)
    }

    @Put('/updateGeneralData')
    @ApiTags('Product Endpoints')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(AccessGuard)
    updateGeneralData(@Body() generalDataDto:UpdateProductGeneralDataDto){
        return this.productsService.updateGeneralData(generalDataDto)
    }

    @Put('/updatePaymentData')
    @ApiTags('Product Endpoints')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(AccessGuard)
    updatePaymentData(@Body() paymentDataDto:UpdateProductPaymentDataDto){
        return this.productsService.updatePaymentData(paymentDataDto)
    }

    @Put('/updateProperties')
    @ApiTags('Product Endpoints')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(AccessGuard)
    updateServiceProperties(@Body() propertiesDto:UpdateProductPropertiesDto){
        return this.productsService.updatePropertiesData(propertiesDto)
    }

    @Put('/updatePhotos')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                files: {
                    type: 'array', // 👈  array of files
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                },
            },
        },
    })
    @ApiTags('Product Endpoints')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(AccessGuard)
    @UseInterceptors(FilesInterceptor('files'))
    updateServicePhotos(@Body() photosDto:UpdateProductPhotosDto,
                        @UploadedFiles() files: Array<Express.Multer.File>){
        const id = photosDto.id;
        const filesUploaded = []
        files.forEach(file => {
            if(file.mimetype.split('/')[0]==='image'){
                if(file.size < 2500000){
                    const fs = require("fs");
                    const path = './uploads/product_'+id+'_'+file.originalname;
                    fs.writeFile(path, file.buffer, (err) => {
                        if (err) throw err;
                    });
                    filesUploaded.push('product_'+id+'_'+file.originalname)
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
        })
        return this.productsService.updateProductPhotos(
            photosDto, filesUploaded
        )
    }

    @Get('/getPhoto/:filename')
    @ApiTags('Product Endpoints')
    getPhoto(@Param('filename') filename: string, @Res() res){
        return of (res.sendFile(join(process.cwd(), './uploads/'+filename)));
    }

    @Delete('/deleteService')
    @ApiTags('Product Endpoints')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(AccessGuard)
    delete(@Body() deleteProductDto:DeleteProductDto){
        return this.productsService.delete(deleteProductDto)
    }

}
