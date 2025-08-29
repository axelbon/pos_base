import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PosService } from './pos.service';
import { CreatePoDto } from './dto/create-po.dto';
import { UpdatePoDto } from './dto/update-po.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('pos')
export class PosController {
  constructor(private readonly posService: PosService) {}

  @Post()
  create(@Body() createPoDto: CreatePoDto) {
    return this.posService.create(createPoDto);
  }

  @Get()
  findAll() {
    return this.posService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.posService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePoDto: UpdatePoDto) {
    return this.posService.update(+id, updatePoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.posService.remove(+id);
  }
}
