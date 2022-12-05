import { DataType, Column, Model, Table, ForeignKey, BelongsTo, AllowNull } from 'sequelize-typescript';
import { AdministratorModel } from 'src/administrators/models/administrator.model';

@Table
export class OrderModel extends Model{
     //GENERAL DATA
     @AllowNull(false)
     @Column
     titleOrder: string;
 
     @AllowNull(false)
     @Column
   descriptionOrder: string;
 
     //PAYMENT DATA
     @AllowNull(false)
     @Column
     currencyOrder: string;
    
     @AllowNull(false)
     @Column(DataType.FLOAT)
     statusOrder: number;

     @AllowNull(false)
     @Column(DataType.FLOAT)
     locationOrder: number;
     

     @AllowNull(false)
     @Column(DataType.FLOAT)
     unitCostOrder: number;
 
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



