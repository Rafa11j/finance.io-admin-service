import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '@users/users.module';
import { ProvidersModule } from '@providers/providers.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfig } from '@config/database';
import { configEnvironment } from '@config/env';
import { CategoriesModule } from './modules/categories/categories.module';
import { AuthModule } from './modules/auth/auth.module';
import { JobsModule } from './modules/jobs/jobs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configEnvironment],
    }),
    JobsModule,
    ProvidersModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
    UsersModule,
    AuthModule,
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
