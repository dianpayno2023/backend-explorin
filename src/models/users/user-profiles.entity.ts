import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base-entity.entity';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UsersEntity } from './users.entity';
import { LocalAddressesEntity } from '../addresses';

@Entity({ name: 'user_profiles' })
export class UserProfilesEntity extends BaseEntity {
  @Column({
    name: 'avatar_url',
    nullable: true,
    type: 'varchar',
    length: 255,
  })
  @IsString()
  avatarUrl: string;

  @ManyToOne(() => UsersEntity, (menu) => menu.userProfiles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  @IsNotEmpty()
  user: UsersEntity;

  @ManyToOne(() => LocalAddressesEntity, (lae) => lae.userProfiles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'local_address_id' })
  @IsOptional()
  localAddress: LocalAddressesEntity;
}
