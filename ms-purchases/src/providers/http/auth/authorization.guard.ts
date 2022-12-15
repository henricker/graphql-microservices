import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';
import { expressjwt, GetVerificationKey } from 'express-jwt';
import { expressJwtSecret } from 'jwks-rsa';
import { promisify } from 'node:util';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  private AUTH0_AUDIENCE: string;
  private AUTH0_DOMAIN: string;

  constructor(private configService: ConfigService) {
    this.AUTH0_AUDIENCE = this.configService.get('AUTH0_AUDIENCE') ?? '';
    this.AUTH0_DOMAIN = this.configService.get('AUTH0_DOMAIN') ?? '';
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const { req: request, res: response } =
        GqlExecutionContext.create(context).getContext();

      const jwtCheck = promisify(
        expressjwt({
          secret: expressJwtSecret({
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 5,
            jwksUri: `${this.AUTH0_DOMAIN}.well-known/jwks.json`,
          }) as GetVerificationKey,
          audience: this.AUTH0_AUDIENCE,
          issuer: this.AUTH0_DOMAIN,
          algorithms: ['RS256'],
        }),
      );
      await jwtCheck(request, response);
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException(err.message, {
        cause: err,
      });
    }

    return true;
  }
}
