import { Category } from '@categories/entities/Category';
import { ICreateCategory } from './create-category';
import { IFindCategoryPaginated } from './find-category-paginated';

export interface ICategoryRepository {
  findAll(user_id: string): Promise<Category[]>;
  findAllPaginated(data: IFindCategoryPaginated): Promise<[Category[], number]>;
  findById(id: string): Promise<Category | undefined>;
  create(createCategory: ICreateCategory): Promise<Category>;
  update(category: Category): Promise<Category>;
  delete(id: string): Promise<void>;
}
