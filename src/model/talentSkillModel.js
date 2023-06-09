const Pool = require("../config/db")

const selectAllTalentSkills = () => {
  return Pool.query(`SELECT * FROM talent_skills`)
}

const selectDetailTalentSkill = (queryId) => {
  return Pool.query(`SELECT * FROM talent_skills WHERE id='${queryId}'`)
}

const selectTalentSkillByIdTalent = (queryId) => {
  return Pool.query(`SELECT skills.name FROM talent_skills INNER JOIN skills ON talent_skills.id_skill = skills.id WHERE id_talent='${queryId}'`)
}

const insertTalentSkill = (queryObject) => {
  const { queryId, id_skill, id_talent } = queryObject
  return Pool.query(
      `INSERT INTO talent_skills(id, id_skill, id_talent)`+
      `VALUES('${queryId}', '${id_skill}', '${id_talent}')`
  );
}

const updateTalentSkill = (queryObject) => {
  const { queryId, id_skill, id_talent } = queryObject
  return Pool.query(
      `UPDATE talent_skills SET id_skill='${id_skill}',`+
      `id_talent='${id_talent}' WHERE id='${queryId}'`
  );
}

const deleteTalentSkill = (queryId) => {
  return Pool.query(`DELETE FROM talent_skills WHERE id='${queryId}'`)
}

module.exports = { 
  selectAllTalentSkills,
  selectDetailTalentSkill,
  selectTalentSkillByIdTalent,
  insertTalentSkill,
  updateTalentSkill,
  deleteTalentSkill
}