import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  url:
    process.env.NODE_ENV == 'teste'
      ? 'mongodb://localhost/emails-test'
      : 'mongodb://localhost/emails',
  synchronize: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  autoLoadEntities: true,
};
