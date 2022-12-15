import { Controller, Get, UseGuards } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { AuthorizationGuard } from './auth/authorization.guard';

@Controller()
export class HttpController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @UseGuards(AuthorizationGuard)
  public getHello() {
    return this.prisma.customer.findMany();
  }
}
