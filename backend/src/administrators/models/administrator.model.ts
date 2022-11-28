import { Column, Model, Table, Unique, AllowNull, HasMany } from 'sequelize-typescript';
import { ProductModel } from "../../products/models/product.model";

@Table
export class AdministratorModel extends Model {
    //PERSONAL DATA
    @AllowNull(false)
    @Column
    name: string;

    @AllowNull(false)
    @Unique
    @Column
    rut: string;

    @Column
    nationality: string;

    @Column
    birthday: Date;

    //CONTACT DATA
    @AllowNull(false)
    @Unique
    @Column
    email: string;

    @AllowNull(false)
    @Unique
    @Column
    phone: string;

    @Column
    address: string;

    @AllowNull(false)
    @Column
    password: string;

    //EXTRA DATA
    @Column({type: 'jsonb'})
    properties: string;

    @Column({ defaultValue: true })
    isActive: boolean;

    @HasMany(() => ProductModel)
    contracts: ProductModel[]

}