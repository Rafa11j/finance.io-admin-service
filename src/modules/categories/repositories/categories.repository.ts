import { Category } from '@categories/entities/Category';
import { CategoryEntityRepository } from '@categories/interfaces/category-entity-repository';
import { ICategoryRepository } from '@categories/interfaces/category-repository';
import { ICreateCategory } from '@categories/interfaces/create-category';
import { IFindCategoryPaginated } from '@categories/interfaces/find-category-paginated';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriesRepository implements ICategoryRepository {
  constructor(
    @InjectRepository(CategoryEntityRepository)
    private readonly categoryRepository: CategoryEntityRepository,
  ) {}

  async findAll(user_id: string): Promise<Category[]> {
    return this.categoryRepository.find({
      where: { user_id },
      order: { name: 'ASC' },
    });
  }

  async findAllPaginated({
    page,
    size,
    user_id,
  }: IFindCategoryPaginated): Promise<[Category[], number]> {
    return this.categoryRepository.findAndCount({
      skip: page,
      take: size,
      where: { user_id },
      order: { name: 'ASC' },
    });
  }

  async findById(id: string): Promise<Category> {
    return this.categoryRepository.findOne(id);
  }

  async create({ name, user_id, color }: ICreateCategory): Promise<Category> {
    const category = this.categoryRepository.create({
      name,
      color,
      user_id,
    });

    await this.categoryRepository.save(category);
    return category;
  }

  async update(category: Category): Promise<Category> {
    return this.categoryRepository.save(category);
  }

  async delete(id: string): Promise<void> {
    await this.categoryRepository.softDelete(id);
  }
}
