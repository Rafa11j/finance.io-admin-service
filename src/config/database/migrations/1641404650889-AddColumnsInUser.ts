import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddColumnsInUser1641404650889
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'active',
        type: 'boolean',
        isNullable: true,
      }),
      new TableColumn({
        name: 'user_type',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('users', ['active', 'user_type']);
  }
}
