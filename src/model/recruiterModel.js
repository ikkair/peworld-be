const Pool = require("../config/db")

const selectAllRecruiters = () => {
  return Pool.query(`SELECT * FROM recruiters ORDER BY name ASC`)
}

const selectDetailRecruiter = (queryId) => {
  return Pool.query(`SELECT * FROM recruiters WHERE id='${queryId}'`)
}

const selectRecruiterByEmail = (queryEmail) => {
  return Pool.query(`SELECT * FROM recruiters WHERE email='${queryEmail}'`)
}

const insertRecruiter = (queryObject) => {
  const { queryId, name, email, company_name, jobdesk, phone, queryPwd } = queryObject
  return Pool.query(
      `INSERT INTO recruiters(id, name, email, company_name, jobdesk, phone, password)`+
      `VALUES('${queryId}', '${name}', '${email}', '${company_name}', '${jobdesk}', '${phone}', '${queryPwd}')`
  );
}

const updateRecruiter = (queryObject) => {
  const { queryId, company_name, company_field, domicile, description, queryFilename } = queryObject
  return Pool.query(
      `UPDATE recruiters SET company_name='${company_name}', company_field='${company_field}', domicile='${domicile}',`+
      `description='${description}', photo='${queryFilename}' WHERE id='${queryId}'`
  );
}

const deleteRecruiter = (queryId) => {
  return Pool.query(`DELETE FROM recruiters WHERE id='${queryId}'`)
}

module.exports = { 
  selectAllRecruiters,
  selectDetailRecruiter,
  selectRecruiterByEmail,
  insertRecruiter,
  updateRecruiter,
  deleteRecruiter
}