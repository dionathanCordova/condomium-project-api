import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class users1640297992927 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          { name: 'apartment', type: 'varchar', isNullable: false },
          { name: 'name', type: 'varchar', isNullable: false },
          { name: 'email', type: 'varchar', isNullable: false },
          { name: 'password', type: 'varchar', isNullable: false },
          { name: 'permission_id', type: 'integer', isNullable: false },
          { name: 'is_admin', type: 'boolean', isNullable: false },
          { name: 'can_show_data', type: 'boolean', default: true },
          { name: 'condominium_id', type: 'uuid', isNullable: false },
          { name: 'avatar', type: 'varchar', isNullable: false },
          { name: 'telephone', type: 'varchar', isNullable: false },
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
    await queryRunner.dropTable('users');
  }
}
