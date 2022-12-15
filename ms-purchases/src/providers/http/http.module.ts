import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from '../database/database.module';
import { HttpController } from './http.controller';
import path from 'node:path';
import { ProductsResolver } from './graphql/resolvers/products.resolver';
import { ProductsService } from '../../services/product.service';
import { PurchasesResolver } from './graphql/resolvers/purchases.resolver';
import { PurchasesService } from '../../services/purchases.service';
import { CustomersService } from '../../services/customers.service';
import { CustomersResolver } from './graphql/resolvers/customers.resolver';
import { MessagingModule } from '../messaging/messaging.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      autoSchemaFile: path.resolve(
        process.cwd(),
        'src/providers/http/graphql/schema.gql',
      ),
      driver: ApolloFederationDriver,
    }),
    MessagingModule,
  ],
  controllers: [HttpController],
  providers: [
    //resolvers
    ProductsResolver,
    PurchasesResolver,
    CustomersResolver,

    //Services
    ProductsService,
    PurchasesService,
    CustomersService,
  ],
})
export class HttpModule {}
