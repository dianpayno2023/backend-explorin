import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '../base-entity.entity';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { RolesEntity } from '../roles';
import { RoleAccessEntity } from '../roles/role-access.entity';
import { UserProfilesEntity } from './user-profiles.entity';
@Entity({ name: 'users' })
export class UsersEntity extends BaseEntity {
  @Column({
    name: 'email',
    nullable: false,
    unique: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column({
    name: 'full_name',
    nullable: false,
    type: 'varchar',
    length: 100,
  })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @Column({
    name: 'user_name',
    nullable: false,
    type: 'varchar',
    length: 100,
  })
  @IsOptional()
  @IsString()
  userName?: string;

  @Column({
    name: 'password',
    nullable: false,
    type: 'varchar',
    length: 255,
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @Column({
    name: 'phone_number',
    nullable: false,
    type: 'varchar',
    length: 15,
  })
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @Column({
    name: 'token',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  token: string;

  @ManyToOne(() => RolesEntity, (data) => data)
  @IsNotEmpty()
  @IsUUID()
  @JoinColumn({ name: 'role_id' })
  role: RolesEntity;

  @OneToMany(() => RoleAccessEntity, (roleAccess) => roleAccess.user)
  roleAccess: RoleAccessEntity[];

  @OneToMany(() => UserProfilesEntity, (userProfile) => userProfile.user)
  userProfiles: UserProfilesEntity[];
}
