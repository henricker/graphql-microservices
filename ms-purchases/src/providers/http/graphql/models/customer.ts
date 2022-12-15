import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Purchase } from './purchase';

@ObjectType('User') // <-- This is the name of the type in the schema to federate know and associate with the 'User' type in the 'user' externals subgraphs
@Directive('@key(fields: "authUserId")') // <-- This is the field in the 'User' type in the 'user' externals subgraphs that will be used to federate
export class Customer {
  id: string;

  @Field(() => ID)
  authUserId: string;

  @Field(() => [Purchase])
  purchases: Purchase;
}
