// Import model
const experienceModel = require("../model/experienceModel")

// Import random id
const { v4: uuidv4 } = require("uuid")

// Import Helper for Template Response
const commonHelper = require("../helper/common")

// Import upload google
const {
    updatePhoto,
    uploadPhoto,
    deletePhoto,
} = require("../config/googleDrive.config");

const getAllExperience = async (req, res) => {
    try {
        const selectResult = await experienceModel.selectAllExperiences()
        if (selectResult.rowCount > 0){
            return commonHelper.response(res, selectResult.rows, 200, "Get all experiences success")
        } else {
            return commonHelper.response(res, null, 404, "No experience available")
        }
    } catch (error) {
        console.log(error)
        return commonHelper.response(res, null, 500, "Failed to get all experience")
    }
}

const getDetailExperience = async (req, res) => {
    // Set param id as const
    const queryId = req.params.id
    // Declare variable for holding query result
    let selectResult
    try {
        selectResult = await experienceModel.selectDetailExperience(queryId)
    } catch (error) {
        console.log(error)
        return commonHelper.response(res, selectResult.rows, 500, "Failed to get detail experience")
    }
    // Check the affected row
    if (selectResult.rowCount > 0) {
        return commonHelper.response(res, selectResult.rows, 200, "Get detail experience success")
    } else {
        return commonHelper.response(res, selectResult.rows, 404, "Experience not found")
    }
}

const addExperience = async (req, res) => {
    // Generate Id
    req.body.queryId = uuidv4()
    // Upload to google drive
    let uploadResult
    try {
        uploadResult = await uploadPhoto(req.file);
        const parentPath = process.env.GOOGLE_DRIVE_PHOTO_PATH;
        req.body.queryFilename = parentPath.concat(uploadResult.id);
    } catch (error) {
        console.log(error)
        // Default if upload error
        req.body.queryFilename = "photo.jpg";
    }
    // Declare variable for holding query result
    let insertResult
    try {
        insertResult = await experienceModel.insertExperience(req.body)
    } catch (error) {
        console.log(error)
        try {
            if (uploadResult) {
                deletePhoto(uploadResult.id)
            }
        } catch (error) {
            console.log(error)
        }
        if (error.detail && error.detail.includes('is not present in table "talents".')) {
            return commonHelper.response(res, null, 400, "Talent id is not present in table talents")
        } else {
            return commonHelper.response(res, null, 500, "Failed to add experience")
        }
    }
    return commonHelper.response(res, insertResult.rows, 200, "Experience added")
}

const editExperience = async (req, res) => {
    // Set param id as const
    const queryId = req.params.id
    req.body.queryId = queryId
    // Declare variable for holding query result
    let selectResult
    try {
        selectResult = await experienceModel.selectDetailExperience(queryId)
        if (selectResult.rowCount < 1) {
            return commonHelper.response(res, null, 404, "Experience not found")
        }
    } catch (error) {
        console.log(error)
        return commonHelper.response(res, null, 500, "Failed to get data experience")
    }
    // Update the old photo
    const oldPhoto = selectResult.rows[0].photo;
    if (req.file) {
        try {
            if (oldPhoto != "undefined" && oldPhoto != "photo.jpg" && oldPhoto != "") {
                const oldPhotoId = oldPhoto.split("=")[1];
                const updateResult = await updatePhoto(
                    req.file,
                    oldPhotoId
                );
                const parentPath = process.env.GOOGLE_DRIVE_PHOTO_PATH;
                req.body.queryFilename = parentPath.concat(updateResult.id);
            } else {
                const uploadResult = await uploadPhoto(req.file);
                const parentPath = process.env.GOOGLE_DRIVE_PHOTO_PATH;
                req.body.queryFilename = parentPath.concat(uploadResult.id);
            }
        } catch (error) {
            console.log(error)
            return commonHelper.response(res, null, 500, "Failed to update experience photo")
        }
    } else {
        req.body.queryFilename = oldPhoto
    }
    // Update other field
    try {
        const updateResult = await experienceModel.updateExperience(req.body)
        return commonHelper.response(res, updateResult.rows, 200, "Experience edited")
    } catch (error) {
        console.log(error)
        if (error.detail && error.detail.includes('is not present in table "talents".')) {
            return commonHelper.response(res, null, 400, "Talent id is not present in table talents")
        } else {
            return commonHelper.response(res, null, 500, "Failed to update experience")
        }
    }
}

const deleteExperience = async (req, res) => {
    // Set param id as const
    const queryId = req.params.id
    // Declare variable for holding query result
    let selectResult
    try {
        selectResult = await experienceModel.selectDetailExperience(queryId)
        if (selectResult.rowCount < 1) {
            return commonHelper.response(res, null, 404, "Experience not found")
        }
    } catch (error) {
        console.log(error)
        return commonHelper.response(res, null, 500, "Failed to get data experience")
    }
    // Declare variable for holding query result
    let deleteResult
    try {
        deleteResult = await experienceModel.deleteExperience(queryId)
        const oldPhoto = selectResult.rows[0].photo;
        if (oldPhoto != "undefined" && oldPhoto != "photo.jpg" && oldPhoto != "") {
            const oldPhotoId = oldPhoto.split("=")[1];
            await deletePhoto(oldPhotoId);
        }
        return commonHelper.response(res, deleteResult.rows, 200, "Experience deleted")
    } catch (error) {
        console.log(error)
        return commonHelper.response(res, null, 500, "Failed to delete experience")
    }
}

module.exports = {
    getAllExperience,
    getDetailExperience,
    addExperience,
    editExperience,
    deleteExperience
}