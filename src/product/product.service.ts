import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/models/product.schema';
import { CreatedProductDto } from 'src/dto/create-product.dto';
import { UpdatePriceDto, UpdateProductDto } from 'src/dto/product.dto';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

    async allProducts() {
        const products = await this.productModel.find()
        return products
    }

    async allProductsUser(id: string) {
        const products = await this.productModel.find({userId: id})
        return products
    }

    async addProduct(product: CreatedProductDto, userId: string) {
        const newProduct = new this.productModel({...product, userId})
        await newProduct.save()
        return newProduct
    }

    async updateProduct(id: string, product: UpdateProductDto) {
        const oneProduct = await this.productModel.findOneAndUpdate({_id: id}, product)
        return oneProduct
    }

    async deleteProduct(id: string) {
        const deleProdcut = await this.productModel.findByIdAndDelete(id)
        return deleProdcut
    }

    async updatePriceProduct(id: string, price: UpdatePriceDto) {
        const product = await this.productModel.findByIdAndUpdate({_id: id}, price)
        return product
    }
}
