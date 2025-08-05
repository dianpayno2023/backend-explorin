import { Module } from '@nestjs/common';
import { TestModule } from './test/test.module';
// import { UsersModule } from "./users/users.module";

@Module({
  imports: [TestModule],
})
export class FeatureModules {}
