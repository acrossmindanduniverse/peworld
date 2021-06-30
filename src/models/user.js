const db = require('../helpers/db')

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
