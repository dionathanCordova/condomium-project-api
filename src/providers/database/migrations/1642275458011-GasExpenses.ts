import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class GasExpenses1642275458011 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'gas-expenses',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          { name: 'apartment', type: 'varchar', isNullable: false },
          { name: 'previous_reading', type: 'float', default: 0 },
          { name: 'current_reading', type: 'float', isNullable: false },
          { name: 'm3_expenses', type: 'float', isNullable: false },
          { name: 'total_value', type: 'float', isNullable: false },
          { name: 'confirm_expense', type: 'boolean', isNullable: false },
          { name: 'condominium_id', type: 'uuid', isNullable: false },
          { name: 'month', type: 'int', isNullable: false },
          { name: 'year', type: 'int', isNullable: false },
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
            name: 'user_cond',
            referencedTableName: 'condominium',
            referencedColumnNames: ['id'],
            columnNames: ['condominium_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('gas-expenses');
  }
}
