import { DatabaseConfigModule } from 'src/config/database/config.module';
import { DatabaseConfigService } from 'src/config/database/config.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [DatabaseConfigModule],
      useFactory: async (databaseConfigService: DatabaseConfigService) => ({
        type: 'postgres',
        host: databaseConfigService.host,
        port: databaseConfigService.port,
        username: databaseConfigService.username,
        password: databaseConfigService.password,
        database: databaseConfigService.database,
        entities: ['./dist/src/modules/**/entities/*.entity.js'],
        migrations: ['./dist/src/providers/database/migrations/*.js'],
        cli: { migrationsDir: './src/src/providers/database/migrations' },
        retryAttempts: 1,
        requestTimeout: 30000,
        options: { enableArithAbort: true },
        synchronize: false,
        logging: true,
      }),
      inject: [DatabaseConfigService],
    }),
  ],
})
export class DatabaseProviderModule {}
