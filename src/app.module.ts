import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IndexModules } from './modules/index.modules';

@Module({
  imports: [IndexModules],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
