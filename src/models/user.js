const db = require('../helpers/db')
const { promisify } = require('util')

const execPromise = promisify(db.query).bind(db)

exports.getTalentById = (id, cb) => {
  db.query(`
  SELECT picture,full_name,job_desk,address,job_type,description
  FROM user_talent 
  LEFT JOIN user ON user_talent.id_user = user.id
  WHERE id_user = ?
  `, [id], cb)
}

exports.getTalentSkill = (id, cb) => {
  db.query(`
  SELECT skill_name FROM user_talent 
  LEFT JOIN user_skill ON user_talent.id_user = user_skill.id_user
  LEFT JOIN skill ON user_skill.id_skill = skill.id
  WHERE user_talent.id_user = ?
  `, [id], cb)
}

exports.getTalentList = (skill, by, offset, cb) => {
  db.query(`
  SELECT picture,full_name, job_desk, address, skill.skill_name  FROM user_talent 
  LEFT JOIN user_skill ON user_talent.id_user = user_skill.id_user
  LEFT JOIN skill ON user_skill.id_skill = skill.id
  LEFT JOIN user ON user_talent.id_user = user.id
  WHERE skill_name LIKE '%${skill}%'
  ORDER BY ? ASC LIMIT 4 OFFSET ?`, [by, offset], cb)
}

exports.countTalent = (skill, cb) => {
  db.query(`
  SELECT COUNT(user_talent.id) as count FROM user_talent
LEFT JOIN user_skill ON user_talent.id_user = user_skill.id_user
LEFT JOIN skill ON user_skill.id_skill = skill.id
WHERE skill.skill_name LIKE "%${skill}%"
  `, cb)
}

exports.getDetailRecruiter = (id) => {
  return execPromise('SELECT user.id, role, user_recruiter.description AS user_description, full_name, company, user_recruiter.instagram AS user_instagram, user_recruiter.linkedin AS user_linkedin, sector, phone_number FROM user LEFT JOIN user_recruiter ON user_recruiter.id_user = user.id WHERE user_recruiter.id_user=?', [id])
}
