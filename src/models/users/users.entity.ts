// export class RegisterUserRequest {
//   email: string;
//   password: string;
//   name: string;
// }

import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base-entity.entity';
import { IsEmail, IsNotEmpty, IsString, IsUrl, IsUUID } from 'class-validator';

// export class UserResponse {
//   email: string;
//   name: string;
//   token?: string;
// }

@Entity({name : 'user'})
export class UserEntity extends BaseEntity {
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
  })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @Column({
    name: 'password',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @Column({
    name: 'phone_number',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @Column({
    name: 'avatar_url',
    nullable: true,
  })
  @IsUrl()
  avatarUrl: string;

  @Column({
    name: 'id_role',
    nullable: false,
  })
  @IsNotEmpty()
  @IsUUID()
  role: string;

  @Column({
    name: 'token',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  token: string;
}
