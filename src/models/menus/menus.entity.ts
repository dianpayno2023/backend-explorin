import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../base-entity.entity';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { RoleAccessEntity } from '../roles';

@Entity({ name: 'menus' })
export class MenusEntity extends BaseEntity {
  @Column({
    name: 'name',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column({
    name: 'prefix',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  prefix: string;

  //Relations
  @OneToMany(() => RoleAccessEntity, (roleAccess) => roleAccess.menu)
  roleAccess: RoleAccessEntity[];
}
