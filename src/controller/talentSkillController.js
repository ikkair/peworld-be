// Import model
const talentSkillModel = require("../model/talentSkillModel")
const skillModel = require("../model/skillModel")

// Import random id
const { v4: uuidv4 } = require("uuid")

// Import Helper for Template Response
const commonHelper = require("../helper/common")

const getAllTalentSkills = async (req, res) => {
    // Set params as const
    try {
        const selectResult = await talentSkillModel.selectAllTalentSkills()
        if (selectResult.rowCount > 0){
            return commonHelper.response(res, selectResult.rows, 200, "Get all talent skill success")
        } else {
            return commonHelper.response(res, null, 404, "No talent skill available")
        }
    } catch (error) {
        console.log(error)
        return commonHelper.response(res, null, 500, "Failed to get all talent skills")
    }
}

const getDetailTalentSkill = async (req, res) => {
    // Set param id as const
    const queryId = req.params.id
    try {
        const selectResult = await talentSkillModel.selectDetailTalentSkill(queryId)
        // Check the affected row
        if (selectResult.rowCount > 0) {
            return commonHelper.response(res, selectResult.rows, 200, "Get detail talent skill success")
        } else {
            return commonHelper.response(res, selectResult.rows, 404, "Talent skill not found")
        }
    } catch (error) {
        console.log(error)
        return commonHelper.response(res, null, 500, "Failed to get detail talent skill")
    }
}

const addTalentSkill = async (req, res) => {
    // Generate Id
    req.body.queryId = uuidv4()
    // Payload
    req.body.id_talent = req.payload.id
    try {
        if (req.body.skill){
            const selectSkillName = await skillModel.selectSkillByName(req.body.skill)
            req.body.id_skill = selectSkillName.rows[0].id
        }
        const insertResult = await talentSkillModel.insertTalentSkill(req.body)
        return commonHelper.response(res, insertResult.rows, 200, "Talent skill added")
    } catch (error) {
        console.log(error)
        if (error.detail && error.detail.includes('is not present in table "skills".')) {
            return commonHelper.response(res, null, 400, "Skill id is not present in table skills")
        } else if (error.detail && error.detail.includes('is not present in table "talents".')) {
            return commonHelper.response(res, null, 400, "Talent id is not present in table talents")
        } else {
            return commonHelper.response(res, null, 500, "Failed to add talent skill")
        }
    }
}

const editTalentSkill = async (req, res) => {
    // Set param id as const
    const queryId = req.params.id
    req.body.queryId = queryId
    // Update other field
    try {
        const updateResult = await talentSkillModel.updateTalentSkill(req.body)
        if (updateResult.rowCount > 0) {
            return commonHelper.response(res, updateResult.rows, 200, "Talent skill edited")
        } else {
            return commonHelper.response(res, null, 404, "Talent skill not found")
        }
    } catch (error) {
        console.log(error)
        if (error.detail && error.detail.includes('is not present in table "skills".')) {
            return commonHelper.response(res, null, 400, "Skill id is not present in table skills")
        } else if (error.detail && error.detail.includes('is not present in table "talents".')) {
            return commonHelper.response(res, null, 400, "Talent id is not present in table talents")
        } else {
            return commonHelper.response(res, null, 500, "Failed to update talent skill")
        }
    }
}

const deleteTalentSkill = async (req, res) => {
    // Set param id as const
    const queryId = req.params.id
    try {
        const deleteResult = await talentSkillModel.deleteTalentSkill(queryId)
        if (deleteResult.rowCount > 0) {
            return commonHelper.response(res, deleteResult.rows, 200, "Talent skill deleted")
        } else {
            return commonHelper.response(res, null, 404, "Talent skill not found")
        }
    } catch (error) {
        console.log(error)
        return commonHelper.response(res, null, 500, "Failed to delete talent skill")
    }
}

module.exports = {
    getAllTalentSkills,
    getDetailTalentSkill,
    addTalentSkill,
    editTalentSkill,
    deleteTalentSkill
}