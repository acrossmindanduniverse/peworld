const userModel = require('../models/user')
const { response } = require('../helpers')
exports.getDetailTalent = (req, res) => {
  const { id } = req.params
  console.log('a')
  userModel.getTalentById(id, (err, results) => {
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
  userModel.getTalentSkill(id, (err, results) => {
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
  const search = req.query.search || ''
  const sort = req.query.sort || 'id'
  const page = req.query.page || 1
  const limit = 4
  const offset = ((limit * page) - limit)
  const pageInfo = {}
  userModel.countTalent(search, (err, dataCount) => {
    if (err) throw err
    pageInfo.totalData = dataCount[0].count
    pageInfo.currentPage = page
    pageInfo.lastPage = Math.ceil(dataCount[0].count / limit)
  })
  userModel.getTalentList(search, sort, offset, (err, results) => {
    if (err) throw err
    pageInfo.dataShowed = `from ${offset + 1} to ${results.length + offset}`
    if (page > pageInfo.lastPage || page < 1) {
      response(res, false, 'page not found', 404)
    } else if (results.length <= 0) {
      response(res, false, `talent with ${search} not found`, 404)
    } else {
      response(res, true, results, 200, pageInfo)
    }
  })
}
