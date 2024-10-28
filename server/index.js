const express = require('express');
const request = require('request');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const userController = require('./controllers/userController');
const myPageController = require('./controllers/myPageController');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('하잉~');
})


// 이미지 로드 -> 효율적 방법 모색중
app.get('/api/image/proxy', (req, res) => {
    const imageUrl = req.query.url;

    if (!imageUrl || imageUrl === null) {
        return res.status(400).send('Image URL 유효하지 않음');
    };

    const options = {
        url: imageUrl,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
            'Referer': 'https://www.naver.com' // 허용된 Referer로 설정 -> 다른 사이트면 수정필요
        }
    }

    request(options)
        .on('error', (err) => {
            console.log(err);
            res.status(500).send('이미지 검색 오류');

        })
        .pipe(res);
})


// User
router.post('/api/user/get', userController.getUser);
router.post('/api/user/create', userController.saveUser);

// MyPage
router.post('/api/myPage/get/webtoon', myPageController.getWebtoonList);
router.post('/api/myPage/save/webtoon', myPageController.saveWebtoon);
router.post('/api/myPage/update/webtoon', myPageController.updateWebtoon);
router.post('/api/myPage/delete/webtoon', myPageController.deleteWebtoon);
router.post('/api/myPage/search/webtoon', myPageController.searchWebtoon);
router.post('/api/myPage/temp/webtoon', myPageController.createAndSaveTempWebtoon);

app.use(router);

app.listen(PORT, () => {
    console.log('서버 시작!');

})