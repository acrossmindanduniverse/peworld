const { promisify } = require('util')
const db = require('../helpers/db')

const execPromise = promisify(db.query).bind(db)

module.exports = {

  addHire: (data) => {
    return execPromise('INSERT INTO hire (`id_user_talent`, `id_user_recruiter`, `id_message`, `company_name`, `email`, `phone_number`, `description`) VALUES (?,?,?,?,?,?,?)', [data.id_user_talent, data.id_user_recruiter, data.id_message, data.company_name, data.email, data.phone_number, data.description])
  }

}
