import { Exclude } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';
import { UUID } from 'crypto';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @DeleteDateColumn({ type: 'timestamptz', default: null, name: 'deleted_at' })
  @Exclude({ toPlainOnly: true })
  deletedAt: Date;

  @CreateDateColumn({
    type: 'timestamptz',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @IsOptional()
  @IsBoolean()
  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  /**
   * Entity row data Created by
   * should be current logged user
   * @default SYSTEM
   */
  @Column({ name: 'created_by', default: 'SYSTEM' })
  createdBy: string;

  /**
   * Entity row data Updated by
   * should be current logged user
   * @default SYSTEM
   */
  @Column({ name: 'updated_by', default: 'SYSTEM' })
  updatedBy: string;

  @Column({ name: 'ref_id', type: 'bigint', nullable: true })
  @Exclude({ toPlainOnly: true })
  refId: string;

  // Lifecycle
  @BeforeInsert()
  async beforeInsert() {
    this.createdBy = 'SYSTEM';
  }

  @BeforeUpdate()
  async beforeUpdate() {
    this.updatedBy = 'SYSTEM';
  }

  //   /**
  //    * Set Current Request to given entity
  //    * this should be append automatically createdBy|updatedBy to current logged user
  //    * based on entity operation
  //    *
  //    * @param req
  //    */
  //   static setCurrentRequest(req: any) {
  //     currentRequest = req;
  //   }
}
