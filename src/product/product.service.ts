import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from 'src/schema/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>){}
  
 async create(createProductDto: CreateProductDto) {
  try {
    const product = await new this.productModel(createProductDto);
    product.save()
    return product;
  } catch (error) {
    console.log(error)
    return `failed to upload ${error}`;
  
  }
 
  }

  async findAll() {
   try {
    return await this.productModel.find();
   } catch (error) {
    console.log(error);
    return error;
   }
  }

  async findOne(_id: string):Promise<Product> {
    try {
      const findByName = await this.productModel.findById(_id);

      if(!findByName){
        throw new HttpException('sorry no product with such name found', 400)
      }
      return findByName
    } catch (error) {
      throw new NotFoundException('not found')
    }
   
      // message: 'Here is your requested product',
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
    
      const updateById = await this.productModel.findByIdAndUpdate(id, updateProductDto, {new: true});

      if(!updateById){
        throw new HttpException('E no dey ooo', 400)
      }
  
      return {
        statusCode: 201,
        message: 'Successfully Updated',
        product: updateById
  
      }
    } catch (error) {
      
      throw new HttpException('E no dey oooeeeee', 400)
    }
  
  }

  async remove(_id: string) {

    try {
      const deleteById = await this.productModel.findByIdAndDelete(_id);
      if(!deleteById){
        throw new HttpException('Nothing to delete', 400)
      }
      return{
        statusCode: 200,
        message: 'succesfully deleted'
      }
    } catch (error) {
      return 'no such id found to delete'
    }
   
   
   
  }
}
