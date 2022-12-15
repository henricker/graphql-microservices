import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from '../database/database.module';

import path from 'node:path';
import { CoursesResolver } from './graphql/resolvers/course.resolver';
import { StudentsResolver } from './graphql/resolvers/student.resolver';
import { EnrollmentResolver } from './graphql/resolvers/enrollment.resolver';
import { CoursesService } from 'src/services/course.service';
import { StudentService } from 'src/services/student.service';
import { EnrollmentsService } from 'src/services/enrollment.service';

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
  ],
  controllers: [],
  providers: [
    //Resolvers
    CoursesResolver,
    StudentsResolver,
    EnrollmentResolver,

    //Services
    CoursesService,
    StudentService,
    EnrollmentsService,
  ],
})
export class HttpModule {}
