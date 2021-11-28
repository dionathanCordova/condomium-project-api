import { Module } from '@nestjs/common';
import { CondConfigModule } from './cond-config/cond-config.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, CondConfigModule],
})
export class IndexModules {}
