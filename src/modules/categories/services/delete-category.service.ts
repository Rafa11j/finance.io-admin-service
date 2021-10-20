import { ICategoryRepository } from '@categories/interfaces/category-repository';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class DeleteCategoryService {
  constructor(
    @Inject('CategoriesRepository')
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new HttpException(
        'Categoria não encontrada!',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.categoryRepository.delete(id);
  }
}
