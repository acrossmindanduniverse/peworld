const { promisify } = require('util')
const db = require('../helpers/db')

const execPromise = promisify(db.query).bind(db)

module.exports = {

  getExperiencesByIdUser: (id) => {
    return execPromise('SELECT user_experience.id, user_experience.id_user, user_experience.position, user_experience.company_name, user_experience.start_join, user_experience.end, user_experience.description, user_experience.created_at, user_experience.updated_at FROM user_experience INNER JOIN user ON user.id = user_experience.id_user WHERE user.id = ?', [id])
  }
  
}