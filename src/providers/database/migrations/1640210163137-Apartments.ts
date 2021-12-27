import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class Apartments1640210163137 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'apartments',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          { name: 'apartment', type: 'varchar', isNullable: false },
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
      }),
    );

    await queryRunner.createForeignKey(
      'apartments',
      new TableForeignKey({
        columnNames: ['condominium_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'condominium',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('apartments');
  }
}
