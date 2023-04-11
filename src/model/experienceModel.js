const Pool = require("../config/db")

const selectAllExperiences = () => {
  return Pool.query(`SELECT * FROM experiences`)
}

const selectDetailExperience = (queryId) => {
  return Pool.query(`SELECT * FROM experiences WHERE id='${queryId}'`)
}

const insertExperience = (queryObject) => {
  const { queryId, id_talent, jobdesk, company_name, date_start, date_end, description, queryFilename} = queryObject
  dateEndValue = `'${date_end}',`
  dateEndInsert = 'date_end,'
  if(date_end == "" || date_end == "undefined"){
    dateEndInsert = ""
    dateEndValue = ""
  }
  return Pool.query(
      `INSERT INTO experiences(id, id_talent, jobdesk, company_name, date_start, ${dateEndInsert} description, photo)`+
      `VALUES('${queryId}', '${id_talent}', '${jobdesk}', '${company_name}', '${date_start}', ${dateEndValue} '${description}', '${queryFilename}')`
  );
}

const updateExperience = (queryObject) => {
  const { queryId, name, link, type, queryFilename } = queryObject
  return Pool.query(
      `UPDATE experiences SET name='${name}', link='${link}',`+
      `type='${type}', photo='${queryFilename}'  WHERE id='${queryId}'`
  );
}

const deleteExperience = (queryId) => {
  return Pool.query(`DELETE FROM experiences WHERE id='${queryId}'`)
}

module.exports = { 
  selectAllExperiences,
  selectDetailExperience,
  insertExperience,
  updateExperience,
  deleteExperience
}