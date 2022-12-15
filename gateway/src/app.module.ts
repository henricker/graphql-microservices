import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        cors: true,
        context: ({ req }) => ({ headers: req.headers }),
      },
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            {
              name: 'ms-purchases',
              url: 'http://localhost:3333/graphql',
            },
            {
              name: 'ms-classroom',
              url: 'http://localhost:3334/graphql',
            },
          ],
        }),
        buildService: ({ url }) =>
          new RemoteGraphQLDataSource({
            url,
            willSendRequest: ({ request, context }) => {
              request.http.headers.set(
                'authorization',
                context?.headers?.authorization,
              );
            },
          }),
      },
    }),
  ],
})
export class AppModule {}
