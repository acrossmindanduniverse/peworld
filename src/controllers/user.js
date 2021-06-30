const userModel = require('../models/user')
const { response } = require('../helpers')
exports.getDetailTalent = (req, res) => {
  const { id } = req.params
  console.log('a')
  userModel.getTalentById(id, (err, results, _fields) => {
    if (!err && results.length === 1) {
      const talent = results[0]

      if (talent.picture !== null) {
        talent.picture = `${process.env.APP_URL}/${talent.picture}`
      }

      response(res, true, talent, 200)
    } else {
      response(res, false, 'talent not forund', 404)
    }
  })
}

exports.getTalentSkill = (req, res) => {
  const { id } = req.params
  // req.authUser.id
  userModel.getTalentSkill(id, (err, results, _fields) => {
    if (!err) {
      const skills = []
      results.map(item => (skills.push(item.skill_name)))
      response(res, true, skills, 200)
    } else {
      response(res, false, 'talent not found', 404)
    }
  })
}

exports.getTalentList = (req, res) => {

}
