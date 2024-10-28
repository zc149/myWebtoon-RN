const userService = require('../services/userService');

const getUser = async (req, res) => {
    const userId = req.body.userId;

    if (!userId) {
        return res.status(400).send("userID가 필요합니다.")
    }

    try {
        const result = await userService.getUserById(userId);

        if (result.length > 0) {
            return res.send(result[0]);
        } else {
            return res.send("false");
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send('서버 오류');
    }

}

const saveUser = async (req, res) => {
    const userId = req.body.userId;

    try {
        userService.saveUserById(userId);
        res.send("저장완료");
    } catch (error) {
        res.status(500).send('서버 오류');
    }
}


module.exports = {
    getUser,
    saveUser,
}