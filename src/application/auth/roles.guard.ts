import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user || !user.roles) {
      throw new ForbiddenException('Acesso negado: Roles não encontradas no token.');
    }

    const userRoles = user.roles.map((role: string) => role.toUpperCase());
    const hasRole = requiredRoles.some((role) => userRoles.includes(role.toUpperCase()));

    if (!hasRole) {
      throw new ForbiddenException('Acesso negado: Você não tem permissão para acessar este recurso.');
    }

    return true;
  }
}
