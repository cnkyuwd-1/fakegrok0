const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const request = require('request');

const app = express();
const targetUrl = 'https://grok.com';  // 目标网址

// 使用中间件解析 JSON 数据和 cookies
app.use(bodyParser.urlencoded({ extended: false }));  // 解析 form 表单数据
app.use(bodyParser.json());  // 解析 JSON 数据
app.use(cookieParser());

// 存储用户提供的 Cookie
let userCookie = '';

// 主页：展示输入 Cookie 的表单
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');  // 提供 HTML 页面
});

// 处理用户提交的 Cookie
app.post('/set-cookie', (req, res) => {
    userCookie = req.body.cookie;  // 获取用户提交的 cookie
    res.cookie('user_cookie', userCookie);  // 将 cookie 存储在用户浏览器中
    res.redirect('/proxy');  // 跳转到代理页面
});

// 反向代理：用用户的 cookie 访问 grok.com
app.all('/proxy/*', (req, res) => {
    if (!userCookie) {
        return res.status(400).send('Please provide your Grok cookie first.');
    }

    const url = targetUrl + req.url.replace('/proxy', '');  // 拼接目标网址和请求路径

    const options = {
        url: url,  // 请求目标网址
        headers: {
            'User-Agent': req.headers['user-agent'],
            'Cookie': userCookie,  // 使用用户提供的 cookie
        },
        method: req.method,
        body: req.body,
    };

    // 转发请求并返回响应
    request(options, (error, response, body) => {
        if (error) {
            return res.status(500).send('Server Error');
        }

        // 检测是否遇到 Cloudflare 盾（简单的方式：检查页面是否包含 Cloudflare 的特定标识）
        if (body.includes("Checking your browser") || body.includes("Just a moment")) {
            return res.status(403).send('盾');  // 如果发现 Cloudflare 盾，返回“盾”
        }

        res.status(response.statusCode).send(body);  // 返回目标网站的响应
    });
});

// 启动服务器
app.listen(8080, () => {
    console.log('Server running on http://localhost:8080');
});
