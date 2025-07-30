import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../base-entity.entity';
import { IsNotEmpty, IsString } from 'class-validator';
import { RegenciesEntity } from './regencies.entity';
import { LocalAddressesEntity } from '../addresses';

@Entity({ name: 'provinces' })
export class ProvincesEntity extends BaseEntity {
  @Column({
    name: 'name',
    nullable: false,
    type: 'varchar',
    length: 100,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  //Relations
  @OneToMany(() => RegenciesEntity, (regency) => regency.province)
  regencies: RegenciesEntity[];

  @OneToMany(() => LocalAddressesEntity, (localAddress) => localAddress.province)
  localAddresses: LocalAddressesEntity[];
}
