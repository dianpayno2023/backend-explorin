import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CommonModule, DBConfig } from './common';
import { FeatureModules } from './features.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(DBConfig.config()),
    CommonModule,
    FeatureModules,
  ],
})
export class AppModule {}
