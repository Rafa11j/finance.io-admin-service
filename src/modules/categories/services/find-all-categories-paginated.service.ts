import { Category } from '@categories/entities/Category';
import { ICategoryRepository } from '@categories/interfaces/category-repository';
import { ICategoryResponse } from '@categories/interfaces/category-response';
import { IFindCategoryPaginated } from '@categories/interfaces/find-category-paginated';
import { Inject, Injectable } from '@nestjs/common';
import { IPaginated } from '@shared/models/paginated';

@Injectable()
export class FindAllCategoriesPaginatedService {
  constructor(
    @Inject('CategoriesRepository')
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute({
    user_id,
    page,
    size,
  }: IFindCategoryPaginated): Promise<IPaginated<ICategoryResponse>> {
    const [categories, count] = await this.categoryRepository.findAllPaginated({
      page: Number(page) * Number(size),
      size: Number(size),
      user_id,
    });

    const total_pages = Math.ceil(count / Number(size));

    const data = categories.map(category => this.buildCategory(category));

    return {
      data,
      page: Number(page),
      elements_in_page: categories.length,
      elements_per_page: Number(size),
      total_elements: count,
      total_pages,
      first_page: Number(page) === 0,
      last_page: Number(page) === total_pages - 1,
    };
  }

  private buildCategory({ id, name }: Category): ICategoryResponse {
    return {
      id,
      name,
    };
  }
}
