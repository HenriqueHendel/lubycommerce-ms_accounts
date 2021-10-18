import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreateAccountsTables extends BaseSchema {
  protected tableName = 'accounts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('secure_id').unique().notNullable()
      table.string('email').unique().notNullable()
      table.string('password').notNullable()
      table.enum('type', ['buyer', 'seller'])
      table.double('balance').notNullable().defaultTo(0)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
