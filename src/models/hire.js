const { promisify } = require('util')
const db = require('../helpers/db')

const execPromise = promisify(db.query).bind(db)

module.exports = {

  addHire: (data) => {
    return execPromise('INSERT INTO hire (`id_user_talent`, `id_user_recruiter`, `id_message`, `company_name`, `Email`, `phone_number`, `description`) VALUES (?,?,?,?,?,?,?)', [data.id_user_talent, data.id_user_recruiter, data.id_message, data.company_name, data.Email, data.phone_number, data.description])
  },

  getHireByIdUserTalent: (id) => {
    return execPromise('SELECT hire.id, message.message, hire.company_name, hire.Email, hire.phone_number, hire.description FROM hire INNER JOIN message ON message.id = hire.id_message WHERE hire.id_user_talent = ?', [id])
  }

}
