const myPageService = require('../services/myPageService');

const getWebtoonList = async (req, res) => {
    const userId = req.body.userId;
    console.log('aa');

    if (!userId) {
        return res.status(400).send("userID가 필요합니다.")
    }

    try {
        const result = await myPageService.getWebtoonListById(userId);
        return res.send(result);

    } catch (error) {
        console.log(error);
        return res.status(500).send('서버 오류');
    }

}

const saveWebtoon = async (req, res) => {
    const userId = req.body.userId;
    const webtoonId = req.body.webtoonId;
    let count = req.body.count;

    if (!userId || !webtoonId) {
        return res.status(400).send("userID, webtoonId가 필요합니다.");
    }

    if (!count) {
        count = 0;
    }

    try {
        const result = await myPageService.saveWebtoonById(userId, webtoonId, count);
        res.send(result);
    } catch (error) {
        console.log(error);
        return res.status(400).send("userID, webtoonId가 필요합니다.");
    }
}

const updateWebtoon = async (req, res) => {
    const userId = req.body.userId;
    const wetboonId = req.body.webtoonId;
    const count = req.body.count;

    if (!userId || !wetboonId) {
        return res.status(400).send("userID, webtoonId가 필요합니다.");
    }

    try {
        const result = await myPageService.updateWebtoonById(userId, wetboonId, count);
        res.send(result);
    } catch (error) {
        console.log(error);
        return res.status(400).send("userID, webtoonId가 필요합니다.")
    }

}

const deleteWebtoon = async (req, res) => {
    const userId = req.body.userId;
    const wetboonId = req.body.webtoonId;

    if (!userId || !wetboonId) {
        return res.status(400).send("userID, webtoonId가 필요합니다.");
    }

    try {
        const result = await myPageService.deleteWebtoonById(userId, wetboonId);
        res.send(result);
    } catch (error) {
        console.log(error);
        return res.status(400).send("userID, webtoonId가 필요합니다.")
    }

}

const searchWebtoon = async (req, res) => {
    const title = req.body.title;

    if (!title) {
        return res.status(400).send("title이 필요합니다.");
    }

    try {
        const result = await myPageService.searchWebtoonByTitle(title);
        res.send(result);
    } catch (error) {
        console.log(error);
        return res.status(400).send("title이 필요합니다.")
    }

}

const createAndSaveTempWebtoon = async (req, res) => {
    const userId = req.body.userId;
    const title = req.body.title;
    const count = req.body.count;

    if (!title) {
        return res.status(400).send("title이 필요합니다.");
    }

    try {
        const insertResult = await myPageService.createTempWebtoonByTitle(title);
        const result = await myPageService.saveWebtoonById(userId, insertResult.insertId, count);
        res.send(result);

    } catch (error) {
        console.log(error);
        return res.status(400).send("title이 필요합니다.")
    }

}

module.exports = {
    getWebtoonList,
    saveWebtoon,
    updateWebtoon,
    deleteWebtoon,
    searchWebtoon,
    createAndSaveTempWebtoon,
}