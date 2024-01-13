"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const product_schema_1 = require("../schema/product.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ProductService = class ProductService {
    constructor(productModel) {
        this.productModel = productModel;
    }
    async create(createProductDto) {
        try {
            const product = await new this.productModel(createProductDto);
            product.save();
            return product;
        }
        catch (error) {
            console.log(error);
            return `failed to upload ${error}`;
        }
    }
    async findAll() {
        try {
            return await this.productModel.find();
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async findOne(_id) {
        try {
            const findByName = await this.productModel.findById(_id);
            if (!findByName) {
                throw new common_1.HttpException('sorry no product with such name found', 400);
            }
            return findByName;
        }
        catch (error) {
            throw new common_1.NotFoundException('not found');
        }
    }
    async update(id, updateProductDto) {
        try {
            const updateById = await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true });
            if (!updateById) {
                throw new common_1.HttpException('E no dey ooo', 400);
            }
            return {
                statusCode: 201,
                message: 'Successfully Updated',
                product: updateById
            };
        }
        catch (error) {
            throw new common_1.HttpException('E no dey oooeeeee', 400);
        }
    }
    async remove(_id) {
        try {
            const deleteById = await this.productModel.findByIdAndDelete(_id);
            if (!deleteById) {
                throw new common_1.HttpException('Nothing to delete', 400);
            }
            return {
                statusCode: 200,
                message: 'succesfully deleted'
            };
        }
        catch (error) {
            return 'no such id found to delete';
        }
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProductService);
//# sourceMappingURL=product.service.js.map