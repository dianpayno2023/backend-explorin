import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base-entity.entity';
import { IsNotEmpty, IsString } from 'class-validator';
import { RegionsEntity } from './regions.entity';

@Entity({ name: 'countries' })
export class CountriesEntity extends BaseEntity {
  @Column({
    name: 'name',
    nullable: false,
    type: 'varchar',
    length: 100,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ManyToOne(() => RegionsEntity, (region) => region.countries, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'region_id' })
  @IsNotEmpty()
  region: RegionsEntity;
}
