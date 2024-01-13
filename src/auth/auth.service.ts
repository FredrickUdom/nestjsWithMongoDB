import { HttpException, Injectable } from '@nestjs/common';
import { User } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { signup } from './dto/signup.dto';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<User>){}

    async signup(payload:signup){
        payload.email = payload.email.toLowerCase()
        const{email, password, ...rest}=payload; 

        const user = await this.userModel.findOne({email});
        if(user){
            throw new HttpException('User with this email already exist', 400)
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const createUser = await this.userModel.create({email, password:hashPassword, ...rest});
        createUser.save();
        delete createUser.password;
        return createUser;
    }


}
