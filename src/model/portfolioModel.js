const Pool = require("../config/db")

const selectAllPortfolios = () => {
  return Pool.query(`SELECT * FROM portfolios`)
}

const selectDetailPortfolio = (queryId) => {
  return Pool.query(`SELECT * FROM portfolios WHERE id='${queryId}'`)
}

const insertPortfolio = (queryObject) => {
  const { queryId, id_talent, name, link, type, queryFilename } = queryObject
  return Pool.query(
      `INSERT INTO portfolios(id, id_talent, name, link, type, photo)`+
      `VALUES('${queryId}', '${id_talent}', '${name}', '${link}', '${type}', '${queryFilename}')`
  );
}

const updatePortfolio = (queryObject) => {
  const { queryId, name, link, type, queryFilename } = queryObject
  return Pool.query(
      `UPDATE portfolios SET name='${name}', link='${link}',`+
      `type='${type}', photo='${queryFilename}'  WHERE id='${queryId}'`
  );
}

const deletePortfolio = (queryId) => {
  return Pool.query(`DELETE FROM portfolios WHERE id='${queryId}'`)
}

module.exports = { 
  selectAllPortfolios,
  selectDetailPortfolio,
  insertPortfolio,
  updatePortfolio,
  deletePortfolio
}