const Pool = require("../config/db")

const selectAllTalents = ({search, sortby, limit, offset}) => {
  return Pool.query(`SELECT * FROM talents WHERE name ILIKE '%${search}%' ORDER BY ${sortby} ASC LIMIT ${limit} OFFSET ${offset}`)
//   return Pool.query(`
// select talents.*, jsonb_agg(skills.*) as skills from talents inner join talent_skills on talents.id = talent_skills.id_talent inner join skills on  talent_skills.id_skill = skills.id group by talents.id, talent_skills.id;
//   `)
}

// Function to count
function countTalents() {
    return Pool.query(`SELECT COUNT(*) FROM talents`);
}

const selectDetailTalent = (queryId) => {
  return Pool.query(`SELECT * FROM talents WHERE id='${queryId}'`)
//   return Pool.query(`
// select talents.*, jsonb_agg(skills.*) as skills from talents inner join talent_skills on talents.id = talent_skills.id_talent inner join skills on  talent_skills.id_skill = skills.id where talents.id = '${queryId}' group by talents.id, talent_skills.id;
//   `)
}

const selectTalentByEmail = (queryEmail) => {
  return Pool.query(`SELECT * FROM talents WHERE email='${queryEmail}'`)
}

const insertTalent = (queryObject) => {
  const { queryId, name, email, phone, queryPwd } = queryObject
  return Pool.query(
    `INSERT INTO talents(id, name, email, phone, password)` +
    `VALUES('${queryId}', '${name}', '${email}', '${phone}', '${queryPwd}')`
  );
}

const updateTalent = (queryObject) => {
  const { queryId, name, jobdesk, domicile, jobtype, description, queryFilename } = queryObject
  return Pool.query(
    `UPDATE talents SET name='${name}', jobdesk='${jobdesk}', domicile='${domicile}',` +
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
  deleteTalent,
  countTalents
}