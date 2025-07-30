import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../base-entity.entity';
import { IsNotEmpty, IsString } from 'class-validator';
import { CountriesEntity } from './countries.entity';

@Entity({ name: 'regions' })
export class RegionsEntity extends BaseEntity {
  @Column({
    name: 'name',
    nullable: false,
    type: 'varchar',
    length: 100,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @OneToMany(() => CountriesEntity, (country) => country.region)
  countries: CountriesEntity[];
}
