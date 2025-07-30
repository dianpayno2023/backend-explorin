import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base-entity.entity';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@Entity({ name: 'shipping_addresses' })
export class ShippingAddressesEntity extends BaseEntity {
  @Column({
    name: 'district',
    nullable: false,
    type: 'varchar',
    length: 255,
  })
  @IsNotEmpty()
  @IsString()
  district: string;

  @Column({
    name: 'postal_code',
    nullable: false,
    type: 'varchar',
    length: 100,
  })
  @IsNotEmpty()
  @IsString()
  postalCode: string;

  @Column({
    name: 'full_address',
    nullable: true,
    type: 'text',
  })
  @IsOptional()
  @IsString()
  fullAddress?: string;
}
