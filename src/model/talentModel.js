const Pool = require("../config/db")

const selectAllTalents = () => {
  return Pool.query(`SELECT * FROM talents ORDER BY name ASC`)
}

const selectDetailTalent = (queryId) => {
  return Pool.query(`SELECT * FROM talents WHERE id='${queryId}'`)
}

const selectTalentByEmail = (queryEmail) => {
  return Pool.query(`SELECT * FROM talents WHERE email='${queryEmail}'`)
}

const insertTalent = (queryObject) => {
  const { queryId, name, email, phone, queryPwd } = queryObject
  return Pool.query(
      `INSERT INTO talents(id, name, email, phone, password)`+
      `VALUES('${queryId}', '${name}', '${email}', '${phone}', '${queryPwd}')`
  );
}

const updateTalent = (queryObject) => {
  const { queryId, name, jobdesk, domicile, jobtype, description, queryFilename} = queryObject
  return Pool.query(
      `UPDATE talents SET name='${name}', jobdesk='${jobdesk}', domicile='${domicile}',`+
      `jobtype='${jobtype}', description='${description}', photo='${queryFilename}' WHERE id='${queryId}'`
  );
}

const deleteTalent = (queryId) => {
  return Pool.query(`DELETE FROM talents WHERE id='${queryId}'`)
}

module.exports = { 
  selectAllTalents,
  selectDetailTalent,
  selectTalentByEmail,
  insertTalent,
  updateTalent,
  deleteTalent
}