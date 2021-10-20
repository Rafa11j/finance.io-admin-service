import { Category } from '@categories/entities/Category';
import { ICategoryRepository } from '@categories/interfaces/category-repository';
import { ICategoryResponse } from '@categories/interfaces/category-response';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FindCategoryService {
  constructor(
    @Inject('CategoriesRepository')
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(id: string): Promise<ICategoryResponse> {
    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new HttpException(
        'Categoria não encontrada!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.buildCategoryResponse(category);
  }

  private buildCategoryResponse({ id, name }: Category): ICategoryResponse {
    return {
      id,
      name,
    };
  }
}
