import User from "../model/userModel.js"

export const create = async (req, res) => {
    try {
        const userData = new User(req.body);

        console.log("Request body:", req.body);

        if (!userData) {
            return res.status(404).json({
                status: 404,
                message: "User data not found in the request.",
            });
        }

        const savedData = await userData.save();

        res.status(200).json({
            status: 200,
            message: "User created successfully.",
            data: savedData,
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: "An error occurred while creating the user.",
            error: err.message,
        });
    }
};


export const getAllData = async (req, res) => {
    try {

        const AlluserData = await User.find()
        if (!AlluserData) {
            return res.status(404).json({ message: "UserData not found" })
        }

        res.status(200).json({ data: AlluserData, msg: "All users Fetched" })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const getOne = async (req, res) => {
    try {
        const id = req.params.id
        const userExist = await User.findById(id)

        if (!userExist) {
            return res.status(404).json({ msg: "User not found" })
        }

        res.status(200).json({ data: userExist, msg: "User Found" })
    }
    catch {
        res.status(500).json({ error: err.message })
    }
}


export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const UserExist = await User.findById(id);
        if (!UserExist) {
            return res.status(404).json({
                status: 404,
                message: "User not found",
            });
        }

        const updatedData = await User.findByIdAndUpdate(id, req.body, { new: true });

        res.status(200).json({
            status: 200,
            message: "User data updated successfully",
            data: updatedData,
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: "An error occurred while updating the user",
            error: err.message,
        });
    }
};



export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        const userExist = await User.findById(id)

        if (!userExist) {
            res.status(400).json({ message: "User Not Found" })
        }

        await User.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted successfully" })
    } catch (error) {
        res.status(500).json({ error: error })
    }
}
