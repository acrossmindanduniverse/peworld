const { promisify } = require('util')
const db = require('../helpers/db')

const execPromise = promisify(db.query).bind(db)

module.exports = {

  getPortofoliosByIdUser: (id) => {
    return execPromise('SELECT user_portofolio.id, user_portofolio.id_user, user_portofolio.app_name, user_portofolio.link_repo, user_portofolio.type, user_portofolio.picture, user_portofolio.created_at, user_portofolio.updated_at FROM user_portofolio INNER JOIN user ON user.id = user_portofolio.id_user WHERE user.id = ?', [id])
  },

  getPortofolioById: (id, cb) => {
    return execPromise('SELECT * FROM user_portofolio WHERE id=?', id, cb)
  },

  updateUserPortofolio: (data, id) => {
    db.query('UPDATE user_portofolio SET ? WHERE id=?', [data, id])
  }

}
