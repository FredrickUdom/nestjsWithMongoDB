import { Body, Controller, Post } from '@nestjs/common';
import { signup } from './dto/signup.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}
    @Post('signup')
    async signup(@Body()payload:signup){
        return await this.authService.signup(payload)

    }
}
