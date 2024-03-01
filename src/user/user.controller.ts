import { Body, Controller, Get, HttpCode, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from 'src/decorators/user.decorator';
import { UserDto } from 'src/dto/user.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('user/profile')
export class UserController {
   constructor(private userService: UserService) {}

   @Get()
   getUserProfile(@CurrentUser('id') id: string) {
      return this.userService.getUserProfile(id);
   }

   @Put()
   @HttpCode(200)
   @UsePipes(new ValidationPipe())
   updateUser(@CurrentUser('id') id: string, @Body() dto: UserDto) {
      return this.userService.updateUser(id, dto);
   }
}
