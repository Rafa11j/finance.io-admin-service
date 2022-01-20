import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginatedParams } from '@shared/models/paginated';
import { User } from '@users/entities/User';
import { ICreateUser } from '@users/interfaces/create-user';
import { UserRepository } from './users-entity-repository';
import { IUsersRepository } from './users-repository.interface';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findAllPaginated({
    page,
    size,
  }: IPaginatedParams): Promise<[User[], number]> {
    return this.userRepository.findAndCount({
      skip: page,
      take: size,
      order: { user_type: 'ASC', name: 'ASC' },
    });
  }

  async findById(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findByToken(token: string): Promise<User> {
    return this.userRepository.findOne({ where: { token } });
  }

  async create({
    email,
    name,
    occupation,
    token_expiration,
    active,
    user_type,
    income,
  }: ICreateUser): Promise<User> {
    const user = this.userRepository.create({
      name,
      email,
      token_expiration,
      occupation,
      active,
      user_type,
      income,
    });

    await this.userRepository.save(user);

    return user;
  }

  async update(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
