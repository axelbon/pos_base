import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { ProductModule } from './product/product.module';
import { PosModule } from './pos/pos.module';

@Module({
  imports: [UserModule, CompanyModule, ProductModule, PosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
