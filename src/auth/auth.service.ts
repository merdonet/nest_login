import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const userObject = {
      email: user.email,
      _id: user._id,
      name: user.name,
      roleId: user.roleId,
    };
    const payload = {
      email: user.email,
      sub: user._id,
      roleId: user.roleId,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: userObject,
    };
  }

  async register(email: string, password: string, name: string) {
    // Check if user exists
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.usersService.create({
      email,
      password: hashedPassword,
      name,
    });

    const userObject = {
      email: user.email,
      _id: user._id,
      name: user.name,
      roleId: user.roleId,
    };

    const payload = {
      email: user.email,
      sub: user._id,
      roleId: user.roleId,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: userObject,
    };
  }
}
