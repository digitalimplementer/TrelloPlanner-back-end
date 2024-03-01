import {
   Body,
   Controller,
   HttpCode,
   Post,
   Req,
   Res,
   UnauthorizedException,
   UsePipes,
   ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { AuthDto } from 'src/dto/auth.dto';

@Controller('auth')
export class AuthController {
   constructor(private readonly authService: AuthService) {}

   @Post('login')
   @HttpCode(200)
   @UsePipes(new ValidationPipe())
   async login(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
      const { refreshToken, ...response } = await this.authService.login(dto);

      this.authService.addRefreshTokenToResponse(res, refreshToken);

      return response;
   }

   @Post('register')
   @HttpCode(200)
   @UsePipes(new ValidationPipe())
   async register(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
      const { refreshToken, ...response } = await this.authService.register(dto);

      this.authService.addRefreshTokenToResponse(res, refreshToken);

      return response;
   }

   @HttpCode(200)
   @Post('login/access-token')
   async getNewToken(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
      const refreshTokenFromCookies = req.cookies[this.authService.REFRESH_TOKEN_NAME];

      if (!refreshTokenFromCookies) {
         this.authService.removeTokenFromResponse(res);
         throw new UnauthorizedException('Refresh Token not passed');
      }

      const { refreshToken, ...response } = await this.authService.getNewTokens(refreshTokenFromCookies);

      this.authService.addRefreshTokenToResponse(res, refreshToken);
      return response;
   }

   @HttpCode(200)
   @Post('logout')
   async logout(@Res({ passthrough: true }) res: Response) {
      this.authService.removeTokenFromResponse(res);
      return true;
   }
}
