import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'AccountsController.index')
  Route.get('/:id', 'AccountsController.show')
  Route.post('', 'AccountsController.store')
  Route.put('/:id', 'AccountsController.update')
  Route.delete('/:id', 'AccountsController.destroy')
}).prefix('accounts')
