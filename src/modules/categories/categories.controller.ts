import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Get,
  Query,
  Param,
  ParseUUIDPipe,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IPaginated } from '@shared/models/paginated';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { Category } from './entities/Category';
import { ICategoryResponse } from './interfaces/category-response';
import { CreateCategoryService } from './services/create-category.service';
import { DeleteCategoryService } from './services/delete-category.service';
import { FindAllCategoriesPaginatedService } from './services/find-all-categories-paginated.service';
import { FindAllCategoriesService } from './services/find-all-categories.service';
import { FindCategoryService } from './services/find-category.service';
import { UpdateCategoryService } from './services/update-category.service';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly createCategoryService: CreateCategoryService,
    private readonly findAllCategoryService: FindAllCategoriesService,
    private readonly findAllCategoryPaginatedService: FindAllCategoriesPaginatedService,
    private readonly findCategoryService: FindCategoryService,
    private readonly updateCategoryService: UpdateCategoryService,
    private readonly deleteCategoryService: DeleteCategoryService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async list(@Request() req): Promise<ICategoryResponse[]> {
    return this.findAllCategoryService.execute(req.user.id);
  }

  @Get('/paginated')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async listPaginated(
    @Request() req,
    @Query('size') size = 20,
    @Query('page') page = 0,
  ): Promise<IPaginated<ICategoryResponse>> {
    return this.findAllCategoryPaginatedService.execute({
      page,
      size,
      user_id: req.user.id,
    });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async find(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ICategoryResponse> {
    return this.findCategoryService.execute(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async create(
    @Request() req,
    @Body() data: CreateCategoryDto,
  ): Promise<Category> {
    return this.createCategoryService.execute({
      name: data.name,
      user_id: req.user.id,
    });
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() { name }: CreateCategoryDto,
  ): Promise<ICategoryResponse> {
    return this.updateCategoryService.execute({
      id,
      name,
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.deleteCategoryService.execute(id);
  }
}
