const { promisify } = require('util')
const db = require('../helpers/db')

const execPromise = promisify(db.query).bind(db)

module.exports = {

  talentRegister: (data) => {
    return execPromise('INSERT INTO user (Email, full_name, password, role, phone_number) VALUE (?, ?, ?, ?, ?)', [data.Email, data.full_name, data.password, data.role, data.phone_number])
  },

  recruiterRegister: (data) => {
    return execPromise('INSERT INTO user (Email, full_name, password, role, company, sector, phone_number) VALUE (?, ?, ?, ?, ?, ?, ?)', [data.Email, data.full_name, data.password, data.role, data.company, data.sector, data.phone_number])
  },

  userLogin: (email) => {
    return execPromise('SELECT id, role, password, full_name, Email, company, sector, phone_number FROM user WHERE Email=?', [email])
  }

}
