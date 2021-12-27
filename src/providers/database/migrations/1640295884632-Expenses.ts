import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Expenses1640295884632 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'expenses',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          { name: 'title', type: 'varchar', isNullable: false },
          { name: 'value', type: 'float', isNullable: false },
          { name: 'month', type: 'int', isNullable: false },
          { name: 'year', type: 'int', isNullable: false },
          { name: 'category_id', type: 'uuid', isNullable: false },
          { name: 'condominium_id', type: 'uuid', isNullable: false },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'current_timestamp',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'current_timestamp',
          },
        ],
        foreignKeys: [
          {
            name: 'expense_cond',
            referencedTableName: 'condominium',
            referencedColumnNames: ['id'],
            columnNames: ['condominium_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'expense_category',
            referencedTableName: 'expenses_category',
            referencedColumnNames: ['id'],
            columnNames: ['category_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('expenses');
  }
}
