import { Module } from '@nestjs/common';
import { EmailsModule } from './emails/emails.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmConfig } from './configs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    EmailsModule,
  ],
})
export class AppModule {}
