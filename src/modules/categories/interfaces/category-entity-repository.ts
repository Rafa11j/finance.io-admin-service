import { Category } from '@categories/entities/Category';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Category)
export class CategoryEntityRepository extends Repository<Category> {}
