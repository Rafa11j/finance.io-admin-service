import { Category } from '@categories/entities/Category';
import { ICategoryRepository } from '@categories/interfaces/category-repository';
import { ICreateCategory } from '@categories/interfaces/create-category';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CreateCategoryService {
  constructor(
    @Inject('CategoriesRepository')
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute({ name, color, user_id }: ICreateCategory): Promise<Category> {
    const category = await this.categoryRepository.create({
      name,
      color,
      user_id,
    });

    return category;
  }
}
