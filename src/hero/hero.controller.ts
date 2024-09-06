import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { HeroService } from './hero.service';
import { CreateHeroDto } from './dto/create-hero.dto';
import { Response } from 'express';
// import { UpdateHeroDto } from './dto/update-hero.dto';

@Controller('hero')
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @Post()
  create(@Body() createHeroDto: CreateHeroDto, @Res() res: Response) {
    return this.heroService.create(createHeroDto, res);
  }

  @Get()
  findAll() {
    return this.heroService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.heroService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateHeroDto: UpdateHeroDto) {
  //   return this.heroService.update(+id, updateHeroDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.heroService.remove(+id);
  }
}
