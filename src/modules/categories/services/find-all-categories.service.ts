import { Category } from '@categories/entities/Category';
import { ICategoryRepository } from '@categories/interfaces/category-repository';
import { ICategoryResponse } from '@categories/interfaces/category-response';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FindAllCategoriesService {
  constructor(
    @Inject('CategoriesRepository')
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(user_id: string): Promise<ICategoryResponse[]> {
    const categories = await this.categoryRepository.findAll(user_id);

    return categories.map(category => this.buildCategoryResponse(category));
  }

  private buildCategoryResponse({ id, name }: Category): ICategoryResponse {
    return {
      id,
      name,
    };
  }
}
