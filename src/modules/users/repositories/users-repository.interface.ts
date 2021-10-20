import { User } from '@users/entities/User';
import { ICreateUser } from '@users/interfaces/create-user';

export interface IUsersRepository {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findByToken(token: string): Promise<User | undefined>;
  create(createUser: ICreateUser): Promise<User>;
  update(user: User): Promise<User>;
}
