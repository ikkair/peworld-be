// Import model
const talentModel = require("../model/talentModel")

// Import random id
const { v4: uuidv4 } = require("uuid")

// Import Helper for Template Response
const commonHelper = require("../helper/common")

// Import hash
const bcrypt = require("bcryptjs");

// Import Helper for authentication
const authHelper = require("../helper/auth");

// Import upload google
const {
    updatePhoto,
    uploadPhoto,
    deletePhoto,
} = require("../config/googleDrive.config");

const getAllTalents = async (req, res) => {
    try {
        const selectResult = await talentModel.selectAllTalents()
        if (selectResult.rowCount > 0) {
            return commonHelper.response(res, selectResult.rows, 200, "Get all talents success")
        } else {
            return commonHelper.response(res, null, 404, "No talent available")
        }
    } catch (error) {
        console.log(error)
        return commonHelper.response(res, null, 500, "Failed to get all talents")
    }
}

const getDetailTalent = async (req, res) => {
    // Set param id as const
    const queryId = req.params.id
    try {
        const selectResult = await talentModel.selectDetailTalent(queryId)
        // Check the affected row
        if (selectResult.rowCount > 0) {
            delete selectResult.rows[0].password
            return commonHelper.response(res, selectResult.rows, 200, "Get detail talent success")
        } else {
            return commonHelper.response(res, selectResult.rows, 404, "Talent not found")
        }
    } catch (error) {
        console.log(error)
        return commonHelper.response(res, null, 500, "Failed to get detail talent")
    }
}

const loginTalent = async (req, res) => {
    let selectResult
    try {
        selectResult = await talentModel.selectTalentByEmail(req.body.email.toLowerCase())
        if (selectResult.rowCount < 1) {
            return commonHelper.response(res, null, 404, "Email not found")
        }
    } catch (error) {
        console.log(error)
        return commonHelper.response(res, null, 500, "Failed to get detail email")
    }
    // Check password
    const isPasswordValid = bcrypt.compareSync(
        req.body.password,
        selectResult.rows[0].password
    )
    delete selectResult.rows[0].password
    if(!isPasswordValid){
        return commonHelper.response(res, null, 400, "Password invalid")
    }
    const payload = {
        id: selectResult.rows[0].id,
        role: "talent"
    };
    const token = authHelper.generateToken(payload);
    const refreshToken = authHelper.generateRefreshToken(payload);
    selectResult.rows[0].token = token
    selectResult.rows[0].refreshToken = refreshToken
    return commonHelper.response(res, selectResult.rows, 200, "Password invalid")
}

const registerTalent = async (req, res) => {
    // Generate Id
    req.body.queryId = uuidv4()
    // Email lowecase
    req.body.email = req.body.email.toLowerCase();
    // Creating hash password
    const salt = bcrypt.genSaltSync(10);
    req.body.queryPwd = bcrypt.hashSync(req.body.password, salt);
    try {
        const insertResult = await talentModel.insertTalent(req.body)
        return commonHelper.response(res, insertResult.rows, 200, "Talent added")
    } catch (error) {
        console.log(error)
        if (error.detail && error.detail.includes('already exists.')) {
            return commonHelper.response(res, null, 400, "Talent email already exist")
        } else {
            return commonHelper.response(res, null, 500, "Failed to add talent")
        }
    }
}

const editTalent = async (req, res) => {
    // Set param id as const
    const queryId = req.params.id
    req.body.queryId = queryId
    // Declare variable for holding query result
    let selectResult
    try {
        selectResult = await talentModel.selectDetailTalent(queryId)
        if (selectResult.rowCount < 1) {
            return commonHelper.response(res, null, 404, "Talent not found")
        }
    } catch (error) {
        console.log(error)
        return commonHelper.response(res, null, 500, "Failed to get data talent")
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
            return commonHelper.response(res, null, 500, "Failed to update talent photo")
        }
    } else {
        req.body.queryFilename = oldPhoto
    }
    // Update other field
    try {
        const updateResult = await talentModel.updateTalent(req.body)
        return commonHelper.response(res, updateResult.rows, 200, "Talent edited")
    } catch (error) {
        console.log(error)
        if (error.detail && error.detail.includes('already exists.')) {
            return commonHelper.response(res, null, 400, "Talent name already exist")
        } else {
            return commonHelper.response(res, null, 500, "Failed to update talent")
        }
    }

}

const deleteTalent = async (req, res) => {
    // Set param id as const
    const queryId = req.params.id
    // Declare variable for holding query result
    let selectResult
    try {
        selectResult = await talentModel.selectDetailTalent(queryId)
        if (selectResult.rowCount < 1) {
            return commonHelper.response(res, null, 404, "Talent not found")
        }
    } catch (error) {
        console.log(error)
        return commonHelper.response(res, null, 500, "Failed to get data talent")
    }
    // Declare variable for holding query result
    let deleteResult
    try {
        deleteResult = await talentModel.deleteTalent(queryId)
        const oldPhoto = selectResult.rows[0].photo;
        if (oldPhoto != "undefined" && oldPhoto != "photo.jpg" && oldPhoto != "") {
            const oldPhotoId = oldPhoto.split("=")[1];
            await deletePhoto(oldPhotoId);
        }
        return commonHelper.response(res, deleteResult.rows, 200, "Talent deleted")
    } catch (error) {
        console.log(error)
        return commonHelper.response(res, null, 500, "Failed to delete talent")
    }

}

module.exports = {
    getAllTalents,
    getDetailTalent,
    loginTalent,
    registerTalent,
    editTalent,
    deleteTalent
}