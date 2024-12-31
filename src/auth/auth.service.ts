import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  NotFoundException,
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

    const payload = {
      email: user.email,
      sub: user._id,
      roles: user.roles,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        email: user.email,
        _id: user._id,
        name: user.name,
        roleId: user.roleId,
        roles: user.roles,
      },
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

  async me(token: string) {
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const decoded = this.jwtService.verify(token);
      if (!decoded || !decoded.sub) {
        throw new UnauthorizedException('Invalid token format');
      }

      const userProfile = await this.usersService.findById(decoded.sub);
      if (!userProfile) {
        throw new NotFoundException('User not found');
      }

      // Return same structure as login
      return {
        access_token: token,
        user: {
          email: userProfile.email,
          _id: userProfile._id,
          name: userProfile.name,
          roleId: userProfile.roleId,
          roles: userProfile.roles,
        },
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new UnauthorizedException('Invalid token');
    }
  }
}
