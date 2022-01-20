import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddIncomeColumnUser1641178195737
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'income',
        type: 'decimal',
        precision: 20,
        scale: 2,
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'income');
  }
}
