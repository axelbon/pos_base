import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { ProductModule } from './product/product.module';
import { PosModule } from './pos/pos.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './typeorm.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    CompanyModule,
    ProductModule,
    PosModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeOrmConfig)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
