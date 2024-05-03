import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  login(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.authService.login(createUsuarioDto);
  }

  @Post('registrar')
  registrar(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.authService.registrar(createUsuarioDto);
  }
}
