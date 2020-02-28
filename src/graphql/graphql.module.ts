import { Module, Logger } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from "path";

const logger = new Logger('Graphql Module')

@Module({
  imports: [
    GraphQLModule.forRoot({
      context: ({ req, res }) => ({ req, res }),
      typePaths: ['./src/**/**.graphql'],
      installSubscriptionHandlers: true,
      resolverValidationOptions: {
        requireResolversForResolveType: true
      },
      definitions: {
        path: join(process.cwd(), 'src/graphql.schema.generated.ts'),
        outputAs: 'class',
      },
      debug: true,
      introspection: true,
      cors: true,
      formatError: (err) => {
        logger.error(`Gql Format Error ${err}`)
        const { extensions: { exception: { status, message } } } = err
        return ({ status, message })
      }
    })
  ],
})
export class GQLModule { }