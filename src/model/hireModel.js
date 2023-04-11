const Pool = require("../config/db")

const selectAllHires = () => {
  return Pool.query(`SELECT * FROM hires`)
}

const selectDetailHire = (queryId) => {
  return Pool.query(`SELECT * FROM hires WHERE id='${queryId}'`)
}

const insertHire = (queryObject) => {
  const { queryId, id_talent, id_recruiter, reason, name, email, phone, description } = queryObject
  return Pool.query(
      `INSERT INTO hires(id, id_talent, id_recruiter, reason, name, email, phone, description)`+
      `VALUES('${queryId}', '${id_talent}', '${id_recruiter}', '${reason}', '${name}', '${email}', '${phone}', '${description}')`
  );
}

const updateHire = (queryObject) => {
  const { queryId, name } = queryObject
  return Pool.query(
      `UPDATE hires SET name='${name}'`+
      `WHERE id='${queryId}'`
  );
}

const deleteHire = (queryId) => {
  return Pool.query(`DELETE FROM hires WHERE id='${queryId}'`)
}

module.exports = { 
  selectAllHires,
  selectDetailHire,
  insertHire,
  updateHire,
  deleteHire
}