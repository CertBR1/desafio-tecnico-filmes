import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { CreateLoginDto } from './dto/create-login.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @ApiBody({ type: CreateLoginDto })
  login(@Body() createLoginDto: CreateLoginDto) {
    return this.authService.login(createLoginDto);
  }

  @Post('registrar')
  @ApiBody({ type: CreateUsuarioDto })
  registrar(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.authService.registrar(createUsuarioDto);
  }
}
