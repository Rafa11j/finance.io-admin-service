import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsers1630011246765 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('teste');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log('teste');
  }
}
