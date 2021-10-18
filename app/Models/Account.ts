import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import { v4 as uuid } from 'uuid'
export default class Account extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column()
  public secure_id: uuid

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public type: 'buyer' | 'seller'

  @column()
  public balance: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(account: Account) {
    if (account.$dirty.password) {
      account.password = await Hash.make(account.password)
    }
  }

  @beforeCreate()
  public static async assignUuid(account: Account) {
    account.secure_id = uuid()
  }
}
