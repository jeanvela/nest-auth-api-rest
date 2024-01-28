import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/models/product.schema';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Product.name,
      schema: ProductSchema
    }
  ])],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AuthMiddleware)
    .exclude({
       path: 'product', method: RequestMethod.GET
    })
    .forRoutes('product')
  }
}
