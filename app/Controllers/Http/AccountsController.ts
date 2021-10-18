import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Account from 'App/Models/Account'

export default class AccountsController {
  public async index() {
    const accounts = await Account.all()

    return accounts
  }

  public async show({ params }: HttpContextContract) {
    const { id } = params

    const account = await Account.findBy('id', id)

    return account
  }

  public async store({ request }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    const type = request.input('type')

    const account = new Account()

    account.email = email
    account.password = password
    account.type = type

    await account.save()

    return account
  }

  public async update({ request, params }: HttpContextContract) {
    const { id } = params

    const email = request.input('email')
    const password = request.input('password')
    const type = request.input('type')
    const balance = request.input('balance')

    const dataToUpdate = {
      ...(email && { email }),
      ...(password && { password }),
      ...(type && { type }),
      ...(balance && { balance }),
    }

    const account = await Account.findBy('id', id)

    account?.merge(dataToUpdate)

    await account?.save()

    return account
  }

  public async destroy({ response, params }: HttpContextContract) {
    const { id } = params

    const account = await Account.findBy('id', id)

    await account?.delete()

    return response.noContent()
  }
}
