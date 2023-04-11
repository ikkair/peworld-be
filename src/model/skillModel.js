const Pool = require("../config/db")

const selectAllSkills = (queryLimit) => {
  if (!queryLimit){
    queryLimit = 10
  }
  return Pool.query(`SELECT * FROM skills ORDER BY name ASC LIMIT '${queryLimit}'`)
}

const selectDetailSkill = (queryId) => {
  return Pool.query(`SELECT * FROM skills WHERE id='${queryId}'`)
}

const insertSkill = (queryObject) => {
  const { queryId, name } = queryObject
  return Pool.query(
      `INSERT INTO skills(id, name)`+
      `VALUES('${queryId}', '${name}')`
  );
}

const updateSkill = (queryObject) => {
  const { queryId, name } = queryObject
  return Pool.query(
      `UPDATE skills SET name='${name}'`+
      `WHERE id='${queryId}'`
  );
}

const deleteSkill = (queryId) => {
  return Pool.query(`DELETE FROM skills WHERE id='${queryId}'`)
}

module.exports = { 
  selectAllSkills,
  selectDetailSkill,
  insertSkill,
  updateSkill,
  deleteSkill
}