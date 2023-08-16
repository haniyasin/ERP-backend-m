import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards,
    UsePipes,
    ValidationPipe
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { Public } from 'src/decorators/public.decorator';
  import { AuthGuard } from './auth.guard';
  import { loginDTO } from './auth.login.dto';
  import { registerDto } from './auth.register.dto';
  
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    @UsePipes(new ValidationPipe())
    async signIn(@Body() login: loginDTO) {
      return await this.authService.signIn(login.email, login.password);
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('register')
    @UsePipes(new ValidationPipe())
    async register(@Body() register: registerDto): Promise<{ access_token: string }> {
      await this.authService.register(register);
      return await this.authService.signIn(register.email, register.password);
    }
    
    // We assign AuthGard making the profile Endpoint protected
    // Meaning we can't access it without a valid token
    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }
  }