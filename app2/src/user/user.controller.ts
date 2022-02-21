import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { AuthCredentialsDTO } from './dto/auth.credentials.dto';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get.user.decorator';

@Controller('user')
export class UserController {
  constructor(private UserService: UserService) {}

  @Get('/profile')
  @UseGuards(AuthGuard())
  getProfile(@GetUser() user: UserEntity) {
    console.log(user);
  }

  @Post('/signup')
  @UsePipes(ValidationPipe)
  signup(@Body() authCredentialsDTO: AuthCredentialsDTO) {
    return this.UserService.signup(authCredentialsDTO);
  }

  @Post('/signin')
  @UsePipes(ValidationPipe)
  signin(@Body() authCredentialsDTO: AuthCredentialsDTO) {
    return this.UserService.signin(authCredentialsDTO);
  }
}
