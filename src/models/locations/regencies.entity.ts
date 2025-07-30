import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../base-entity.entity';
import { IsNotEmpty, IsString } from 'class-validator';
import { ProvincesEntity } from './provinces.entity';
import { LocalAddressesEntity } from '../addresses';
import { RegencyEnum } from '@/common/enums';

@Entity({ name: 'regencies' })
export class RegenciesEntity extends BaseEntity {
  @Column({
    name: 'name',
    nullable: false,
    type: 'varchar',
    length: 100,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column({
    name: 'type',
    nullable: false,
    type: 'enum',
    enum: RegencyEnum,
    enumName: 'regency_enum',
    default : RegencyEnum.KABUPATEN
  })
  @IsNotEmpty()
  @IsString()
  type: RegencyEnum;

  @ManyToOne(() => ProvincesEntity, (province) => province.regencies, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'province_id' })
  @IsNotEmpty()
  province: ProvincesEntity;

  @OneToMany(() => LocalAddressesEntity, (localAddress) => localAddress.regency)
  localAddresses: LocalAddressesEntity[];
}
