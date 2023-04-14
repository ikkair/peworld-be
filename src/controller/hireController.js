// Import model
const hireModel = require("../model/hireModel")

// Import random id
const { v4: uuidv4 } = require("uuid")

// Import Helper for Template Response
const commonHelper = require("../helper/common")

const getAllHires = async (req, res) => {
    try {
        const selectResult = await hireModel.selectAllHires()
        if (selectResult.rowCount > 0){
            return commonHelper.response(res, selectResult.rows, 200, "Get all hires success")
        } else {
            return commonHelper.response(res, null, 404, "No hire available")
        }
    } catch (error) {
        console.log(error)
        return commonHelper.response(res, null, 500, "Failed to get all hire")
    }
}

const getDetailHire = async (req, res) => {
    // Set param id as const
    const queryId = req.params.id
    try {
        const selectResult = await hireModel.selectDetailHire(queryId)
        // Check the affected row
        if (selectResult.rowCount > 0) {
            return commonHelper.response(res, selectResult.rows, 200, "Get detail hire success")
        } else {
            return commonHelper.response(res, selectResult.rows, 404, "Hire not found")
        }
    } catch (error) {
        console.log(error)
        return commonHelper.response(res, null, 500, "Failed to get detail hire")
    }
}

const addHire = async (req, res) => {
    // Generate Id
    req.body.queryId = uuidv4()
    // Payload
    req.body.id_recruiter = req.payload.id
    try {
        const insertResult = await hireModel.insertHire(req.body)
        return commonHelper.response(res, insertResult.rows, 200, "Hire added")
    } catch (error) {
        console.log(error)
        if (error.detail && error.detail.includes('is not present in table "talents".')) {
            return commonHelper.response(res, null, 400, "Talent id is not present in table talents")
        } else if (error.detail && error.detail.includes('is not present in table "recruiters".')) {
            return commonHelper.response(res, null, 400, "Recruiter id is not present in table recruiters")
        } else {
            return commonHelper.response(res, null, 500, "Failed to add recruiter")
        }
    }
}

const editHire = async (req, res) => {
    // Set param id as const
    const queryId = req.params.id
    req.body.queryId = queryId
    // Update other field
    try {
        const updateResult = await hireModel.updateHire(req.body)
        if (updateResult.rowCount > 0) {
            return commonHelper.response(res, updateResult.rows, 200, "Hire edited")
        } else {
            return commonHelper.response(res, null, 404, "Hire not found")
        }
    } catch (error) {
        console.log(error)
        if (error.detail && error.detail.includes('is not present in table "talents".')) {
            return commonHelper.response(res, null, 400, "Talent id is not present in table talents")
        } else if (error.detail && error.detail.includes('is not present in table "recruiters".')) {
            return commonHelper.response(res, null, 400, "Recruiter id is not present in table recruiters")
        } else {
            return commonHelper.response(res, null, 500, "Failed to update recruiter")
        }
    }
}

const deleteHire = async (req, res) => {
    // Set param id as const
    const queryId = req.params.id
    try {
        const deleteResult = await hireModel.deleteHire(queryId)
        if (deleteResult.rowCount > 0) {
            return commonHelper.response(res, deleteResult.rows, 200, "Hire deleted")
        } else {
            return commonHelper.response(res, null, 404, "Hire not found")
        }
    } catch (error) {
        console.log(error)
        return commonHelper.response(res, null, 500, "Failed to delete hire")
    }
}

module.exports = {
    getAllHires,
    getDetailHire,
    addHire,
    editHire,
    deleteHire
}