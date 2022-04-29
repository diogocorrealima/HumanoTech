import { Controller, Post, Body, Scope, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';

@ApiBearerAuth()
@ApiTags('auth')
@Controller({ path: 'auth', scope: Scope.REQUEST })
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly logger: Logger,
  ) {
    this.logger = new Logger(AuthController.name);
  }

  @Post()
  async login(@Body() loginDto: LoginDto) {
    this.logger.log(`Buscando usuario por username: ${loginDto?.username}`);
    const user = await this.userService.findByUsername(loginDto.username);
    if (user && user.password === loginDto.password) {
      this.logger.log(
        `Usuario encontrado e password validado: ${loginDto?.username}`,
      );
      const payload = {
        username: user.username,
        sub: user.username,
      };
      console.log(JSON.stringify(payload));
      return { accessToken: await this.jwtService.signAsync(payload) };
    }
    this.logger.warn(
      `Erro ao buscar usuario. Login ou senha incorreto: ${loginDto.username}`,
    );
    this.logger.error(
      `Erro ao buscar usuario. Login ou senha incorreto: ${loginDto.username}`,
    );
    return null;
  }
}
