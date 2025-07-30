import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from '../base-entity.entity';
import { UsersEntity } from '../users';
import { RoleAccessEntity } from './role-access.entity';

@Entity({ name: 'roles' })
export class RolesEntity extends BaseEntity {
  @Column({
    name: 'name',
    nullable: false,
    unique: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  // Relations
  @OneToMany(() => UsersEntity, (user) => user.role)
  users: UsersEntity[];
}
