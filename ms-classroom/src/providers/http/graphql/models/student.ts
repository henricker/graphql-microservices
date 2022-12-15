import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Enrollment } from './enrollment';

@ObjectType('User')
@Directive('@extends') // To extends the User from the external main subgraph
@Directive('@key(fields: "authUserId")') // Associate the User with the external main subgraph
export class Student {
  id: string;

  @Field(() => ID)
  @Directive('@external') // To extends the User from the external main subgraph
  authUserId: string;

  @Field(() => [Enrollment])
  enrollments: Enrollment[];
}
