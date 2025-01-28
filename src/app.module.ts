import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { TypeOrmConfigService } from './config/database.config';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      // envFilePath: process.env.NODE_ENV
      //   ? `.env.${process.env.NODE_ENV}`
      //   : '.env',
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useClass: TypeOrmConfigService,
    // }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        const data: TypeOrmModuleOptions = {
          type: 'mysql',
          host: configService.get<string>('MYSQL_HOST'),
          port: configService.get<number>('MYSQL_PORT'),
          database: configService.get<string>('MYSQL_DATABASE'),
          username: configService.get<string>('MYSQL_USER'),
          password: configService.get<string>('MYSQL_PASSWORD'),
          entities: [User],
          synchronize: true,
        };

        console.log('data:', data);
        return data;
      },
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
