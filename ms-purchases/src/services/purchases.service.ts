import { Injectable, NotFoundException } from '@nestjs/common';
import { KafkaService } from 'src/providers/messaging/kafka.service';
import { PrismaService } from '../providers/database/prisma/prisma.service';

type CreatePurchaseParams = {
  customerId: string;
  productId: string;
};

@Injectable()
export class PurchasesService {
  constructor(
    private prisma: PrismaService,
    private kafkaService: KafkaService,
  ) {}

  listAllPurchases() {
    return this.prisma.purchase.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async createPurchase({ customerId, productId }: CreatePurchaseParams) {
    const productExists = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!productExists) {
      throw new NotFoundException('Product not found');
    }

    const customerExists = await this.prisma.customer.findUnique({
      where: {
        id: customerId,
      },
    });

    if (!customerExists) {
      throw new NotFoundException('Customer not found');
    }

    this.kafkaService.emit(this.kafkaService.topics.PURCHASE_NEW_PURCHASE, {
      customer: {
        authUserId: customerExists.authUserId,
      },
      product: {
        id: productExists.id,
        title: productExists.title,
        slug: productExists.slug,
      },
    });

    return this.prisma.purchase.create({
      data: {
        customerId,
        productId,
      },
    });
  }

  getPurchasesByAuthUserId(authUserId: string) {
    return this.prisma.purchase.findMany({
      where: {
        customer: {
          authUserId,
        },
      },
      include: {
        product: true,
      },
    });
  }
}
