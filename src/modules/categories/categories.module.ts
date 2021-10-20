import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesController } from './categories.controller';
import { Category } from './entities/Category';
import { CategoryEntityRepository } from './interfaces/category-entity-repository';
import { categoryProviders } from './providers';
import { CreateCategoryService } from './services/create-category.service';
import { DeleteCategoryService } from './services/delete-category.service';
import { FindAllCategoriesPaginatedService } from './services/find-all-categories-paginated.service';
import { FindAllCategoriesService } from './services/find-all-categories.service';
import { FindCategoryService } from './services/find-category.service';
import { UpdateCategoryService } from './services/update-category.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category, CategoryEntityRepository])],
  controllers: [CategoriesController],
  providers: [
    ...categoryProviders,
    CreateCategoryService,
    FindAllCategoriesService,
    FindAllCategoriesPaginatedService,
    FindCategoryService,
    UpdateCategoryService,
    DeleteCategoryService,
  ],
  exports: [...categoryProviders],
})
export class CategoriesModule {}
