import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';


const users: { email: string, password: string }[] = [];

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService){}

  async signup(dto: SignupDto): Promise<{ access_token: string }>{
    const exists = users.find(u => u.email === dto.email);
    if(exists) throw new ConflictException('User already exists');
    const hash = await bcrypt.hash(dto.password, 10);
    users.push({email: dto.email, password: hash});
    const access_token = await this.jwtService.signAsync({ email: dto.email });
    return { access_token };
  }

  async signin(dto: SigninDto): Promise<{ access_token: string }> {
    const user = users.find(u => u.email === dto.email);
    if(!user) throw new UnauthorizedException('Invalid credentials');
    const match = await bcrypt.compare(dto.password, user.password);
    if(!match) throw new UnauthorizedException('Invalid credentials');
    const access_token = await this.jwtService.signAsync({ email: dto.email });
    return { access_token };
  }

}
