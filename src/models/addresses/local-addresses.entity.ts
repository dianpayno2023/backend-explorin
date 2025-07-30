import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../base-entity.entity';
import { IsOptional, IsString } from 'class-validator';
import { UserProfilesEntity } from '../users';
import { ProvincesEntity } from '../locations/provinces.entity';
import { RegenciesEntity } from '../locations';

@Entity({ name: 'local_addresses' })
export class LocalAddressesEntity extends BaseEntity {
  @Column({
    name: 'postal_code',
    nullable: true,
    unique: true,
  })
  @IsOptional()
  @IsString()
  postalCode?: string;

  @Column({
    name: 'full_address',
    nullable: true,
    unique: true,
    type: 'text',
  })
  @IsOptional()
  @IsString()
  fullAddress?: string;

  //Relations

  @OneToMany(
    () => UserProfilesEntity,
    (userProfile) => userProfile.localAddress,
  )
  userProfiles: UserProfilesEntity[];

  @ManyToOne(() => ProvincesEntity, (province) => province.localAddresses, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'province_id' })
  @IsOptional()
  province: ProvincesEntity;

  @ManyToOne(() => RegenciesEntity, (regency) => regency.localAddresses, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'regency_id' })
  @IsOptional()
  regency: RegenciesEntity;
}
