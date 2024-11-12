// auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Set to true to ignore expiration if needed
      secretOrKey: process.env.JWT_SECRET, // Secret used to verify JWT signature
    });
  }

  async validate(payload: JwtPayload) {
    // Find and return the user based on the JWT payload
    const user = await this.authService.validateUser(payload);
    return user;
  }
}
