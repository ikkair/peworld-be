// Import model
const skillModel = require("../model/skillModel")

// Import random id
const { v4: uuidv4 } = require("uuid")

// Import Helper for Template Response
const commonHelper = require("../helper/common")

const getAllSkills = async (req, res) => {
    // Set params as const
    const queryLimit = req.query.limit
    try {
        const selectResult = await skillModel.selectAllSkills(queryLimit)
        if (selectResult.rowCount > 0){
            return commonHelper.response(res, selectResult.rows, 200, "Get all skills success")
        } else {
            return commonHelper.response(res, null, 404, "No skill available")
        }
    } catch (error) {
        console.log(error)
        return commonHelper.response(res, null, 500, "Failed to get all skills")
    }
}

const getDetailSkill = async (req, res) => {
    // Set param id as const
    const queryId = req.params.id
    try {
        const selectResult = await skillModel.selectDetailSkill(queryId)
        // Check the affected row
        if (selectResult.rowCount > 0) {
            return commonHelper.response(res, selectResult.rows, 200, "Get detail skill success")
        } else {
            return commonHelper.response(res, selectResult.rows, 404, "Skill not found")
        }
    } catch (error) {
        console.log(error)
        return commonHelper.response(res, null, 500, "Failed to get detail skill")
    }
}

const addSkill = async (req, res) => {
    // Generate Id
    req.body.queryId = uuidv4()
    try {
        const insertResult = await skillModel.insertSkill(req.body)
        return commonHelper.response(res, insertResult.rows, 200, "Skill added")
    } catch (error) {
        console.log(error)
        if (error.detail && error.detail.includes('already exists.')) {
            return commonHelper.response(res, null, 400, "Skill name already exist")
        } else {
            return commonHelper.response(res, null, 500, "Failed to add skill")
        }
    }
}

const editSkill = async (req, res) => {
    // Set param id as const
    const queryId = req.params.id
    req.body.queryId = queryId
    // Update other field
    try {
        const updateResult = await skillModel.updateSkill(req.body)
        if (updateResult.rowCount > 0) {
            return commonHelper.response(res, updateResult.rows, 200, "Skill edited")
        } else {
            return commonHelper.response(res, null, 404, "Skill not found")
        }
    } catch (error) {
        console.log(error)
        if (error.detail && error.detail.includes('already exists.')) {
            return commonHelper.response(res, null, 400, "Skill name already exist")
        } else {
            return commonHelper.response(res, null, 500, "Failed to update skill")
        }
    }
}

const deleteSkill = async (req, res) => {
    // Set param id as const
    const queryId = req.params.id
    try {
        const deleteResult = await skillModel.deleteSkill(queryId)
        if (deleteResult.rowCount > 0) {
            return commonHelper.response(res, deleteResult.rows, 200, "Skill deleted")
        } else {
            return commonHelper.response(res, null, 404, "Skill not found")
        }
    } catch (error) {
        console.log(error)
        return commonHelper.response(res, null, 500, "Failed to delete skill")
    }
}

module.exports = {
    getAllSkills,
    getDetailSkill,
    addSkill,
    editSkill,
    deleteSkill
}