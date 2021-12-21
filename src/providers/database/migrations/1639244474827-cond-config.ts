import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class condConfig1639244474827 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'config',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          { name: 'basic_water_rate', type: 'float', isNullable: false },
          { name: 'average_water_rate', type: 'float', isNullable: false },
          { name: 'high_water_rate', type: 'float', isNullable: false },
          { name: 'cleaning_fee', type: 'float' },
          { name: 'reserve_value', type: 'float' },
          { name: 'm3_gas_value', type: 'float' },
          { name: 'liquidator_exempt', type: 'boolean' },
          { name: 'payment_plan', type: 'varchar' },
          { name: 'year', type: 'float', isNullable: false },
          { name: 'condominium_id', type: 'uuid', isNullable: false },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' },
          { name: 'updater_id', type: 'varchar', isNullable: true },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'config',
      new TableForeignKey({
        columnNames: ['condominium_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'condominium',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('config');
  }
}
