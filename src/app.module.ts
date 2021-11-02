import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/api/config.module';
import { IndexModules } from './modules/index.modules';
import { DatabaseProviderModule } from './providers/database/provider.module';

@Module({
  imports: [AppConfigModule, DatabaseProviderModule, IndexModules],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
