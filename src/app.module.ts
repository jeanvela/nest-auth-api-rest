import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot("mongodb://127.0.0.1/authNest"), AuthModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
