import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '@users/users.module';
import { MediasModule } from '@medias/medias.module';

import { ormconfig } from '@config/ormconfig';

console.log(process.env.DB_HOST);

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), UsersModule, MediasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

console.log(process.env.DB_HOST);
