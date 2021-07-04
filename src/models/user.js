const db = require('../helpers/db')
const { promisify } = require('util')

const execPromise = promisify(db.query).bind(db)

exports.getTalentById = (id, cb) => {
  db.query(`
  SELECT picture,full_name,job_desk,address,job_type,description,email,phone_number,company
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

exports.getTalentList = (search, sort, offset, asc, cb) => {
  db.query(`
  SELECT picture,full_name, job_desk, address, skill.skill_name, job_type, user_talent.id_user FROM user_talent 
  LEFT JOIN user_skill ON user_talent.id_user = user_skill.id_user
  LEFT JOIN skill ON user_skill.id_skill = skill.id
  LEFT JOIN user ON user_talent.id_user = user.id
  WHERE skill_name LIKE '%${search}%'
  ORDER BY ${sort} ${asc} LIMIT 4 OFFSET ?`, [offset], cb)
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
  return execPromise('SELECT user.id, role, user_recruiter.city, user_recruiter.description AS user_description, user_recruiter.picture, full_name, company, user.Email, user_recruiter.instagram AS user_instagram, user_recruiter.linkedin AS user_linkedin, sector, phone_number FROM user LEFT JOIN user_recruiter ON user_recruiter.id_user = user.id WHERE user_recruiter.id_user=?', [id])
}

exports.updateUserRecruiter = (data, id, cb) => {
  db.query('UPDATE user_recruiter SET ? WHERE id_user=?', [data, id], cb)
}

exports.updateUser = (data, id, cb) => {
  db.query('UPDATE user SET ? WHERE id=?', [data, id], cb)
}

exports.getUserById = (id, cb) => {
  db.query('SELECT * FROM user WHERE id=?', [id], cb)
}

exports.getUserRecruiterById = (id, cb) => {
  db.query('SELECT * FROM user_recruiter WHERE id_user=?', [id], cb)
}

exports.updateUserRecruiterImage = (data, cb) => {
  const key = Object.keys(data)
  const lastColumn = key[key.length - 1]
  db.query(`UPDATE user_recruiter SET ${lastColumn}=? WHERE id_user=?`, [[data[lastColumn]], data.id], cb)
}

exports.updateProfileMain = (data, cb) => {
  db.query(`
  UPDATE ?? SET full_name=?, company=? WHERE id = ?
  `, ['user', data.fullName, data.company, data.id], cb)
}

exports.updateProfileDetail = (data, cb) => {
  db.query(`
  UPDATE ?? SET job_desk=?,address=?,description=?,job_type=? WHERE id_user = ?
  `, ['user_talent', data.jobDesk, data.address, data.description, data.jobType, data.id], cb)
}

exports.updateUserTalentPicture = (data, cb) => {
  const key = Object.keys(data)
  const lastColumn = key[key.length - 1]
  db.query(`UPDATE ?? SET ${lastColumn}=? WHERE id_user=?`, ['user_talent', [data[lastColumn]], data.id], cb)
}
exports.getSkillByName = (skill, cb) => {
  db.query(`
  SELECT id FROM skill WHERE skill_name=?
`, [skill], cb)
}

exports.addTalentSkill = (id, skills, cb) => {
  db.query(`
  INSERT INTO user_skill (id_user, id_skill) VALUES (?,?)`, [id, skills], cb)
}
