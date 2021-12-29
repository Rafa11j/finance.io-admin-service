import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AlterTableCategoryAddColorColumn1640708838241
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'categories',
      new TableColumn({
        name: 'color',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('categories', 'color');
  }
}
