import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { SignupInput } from './dto/signup.input';
import { LoginInput } from './dto/login.input';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(input: SignupInput) {
    // 1. Check if user exists
    const existingUser = await this.usersService.findByEmail(input.email);
    if (existingUser) throw new ConflictException('Email already in use');

    // 2. Hash the password (one-way encryption)
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(input.password, saltRounds);

    // 3. Save to database
    const user = await this.usersService.create({
      username: input.username,
      email: input.email,
      password_hash,
    });

    // 4. Return token
    return this.generateAuthResponse(user);
  }

  async login(input: LoginInput) {
    // 1. Find user
    const user = await this.usersService.findByEmail(input.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    // 2. Compare passwords
    const isPasswordValid = await bcrypt.compare(input.password, user.password_hash);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

    // 3. Return token
    return this.generateAuthResponse(user);
  }

  private generateAuthResponse(user: User) {
    // This payload is embedded securely inside the JWT
    const payload = { sub: user.id, email: user.email, username: user.username };
    return {
      accessToken: this.jwtService.sign(payload),
      user,
    };
  }
}
