import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Patch, Post, Put, Request } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreatedProductDto } from 'src/dto/create-product.dto';
import { UpdatePriceDto, UpdateProductDto } from 'src/dto/product.dto';
import { User } from 'src/interfaces/request.user';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Get()
    allProducts() {
        try {
            return this.productService.allProducts()
        } catch (error) {
            throw error
        }
    }

    @Get(':id')
    async allProductUser(@Param('id') id: string) {
        try {
            const products = await this.productService.allProductsUser(id)
            if (!products) throw new NotFoundException('Products not found')
            return products
        } catch (error) {
            throw error
        }
    }

    @Post()
    async createdProduct(@Body() body: CreatedProductDto, @Request() req: User) {
        try {
            const newProduct = await this.productService.addProduct(body, req.user.id)
            return newProduct
        } catch (error) {
            throw error
        }
    }

    @Delete()
    async deleteProduct(@Param('id') id: string) {
        try {
            const product = await this.productService.deleteProduct(id)
            if (product) throw new NotFoundException('Product not found')
            return HttpStatus.NO_CONTENT
        } catch (error) {
            throw error
        }
    }

    @Put()
    async updateProduct(@Param('id') id: string, @Body() body: UpdateProductDto) {
        try {
            const product = await this.productService.updateProduct(id, body)
            if (!product) throw new NotFoundException('Product Not found')
            return HttpStatus.NO_CONTENT
        } catch (error) {
            throw error
        }
    }

    @Patch()
    async updatePrice(@Param('id') id: string, @Body() body: UpdatePriceDto) {
        try {
            const product = await this.productService.updatePriceProduct(id, body)
            if (!product) throw new NotFoundException('Product not found')
            return HttpStatus.NO_CONTENT
        } catch (error) {
            throw error
        }
    }
}
