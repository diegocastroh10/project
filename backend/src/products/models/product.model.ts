import { DataType, Column, Model, Table, ForeignKey, BelongsTo, AllowNull } from 'sequelize-typescript';
import { AdministratorModel } from "../../administrators/models/administrator.model";

@Table
export class ProductModel extends Model {
    //GENERAL DATA
    @AllowNull(false)
    @Column
    title: string;

    @AllowNull(false)
    @Column
  description: string;

    //PAYMENT DATA
    @AllowNull(false)
    @Column
    currency: string;

    @AllowNull(false)
    @Column(DataType.FLOAT)
    unitCost: number;

    //EXTRA DATA
    @AllowNull(false)
  @Column({type: 'jsonb'})
  properties: string;

  @AllowNull(false)
  @ForeignKey(() => AdministratorModel)
  @Column
  administratorId: number;

  @BelongsTo(() => AdministratorModel)
  administrator: AdministratorModel;
}