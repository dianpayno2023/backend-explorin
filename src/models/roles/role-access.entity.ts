import { IsNotEmpty } from 'class-validator';
import {  Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { UsersEntity } from '../users';
import { BaseEntity } from '../base-entity.entity';
import { MenusEntity } from '../menus';

@Entity({ name: 'role_access' })
@Unique(['user', 'menu'])
export class RoleAccessEntity extends BaseEntity {
  @ManyToOne(() => UsersEntity, (user) => user.roleAccess, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  @IsNotEmpty()
  user: UsersEntity;

  @ManyToOne(() => MenusEntity, (menu) => menu.roleAccess, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'menu_id' })
  @IsNotEmpty()
  menu: MenusEntity;
}
