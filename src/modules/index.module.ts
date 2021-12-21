import { Module } from '@nestjs/common';
import { CondConfigModule } from './cond-config/cond-config.module';
import { CondominiumModule } from './condominium/condominium.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, CondConfigModule, CondominiumModule],
})
export class IndexModules {}
