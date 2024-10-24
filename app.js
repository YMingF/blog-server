let express = require("express");
let cors = require("cors");
let session = require("express-session");

let app = express();

// CORS 配置
app.use(
  cors({
    origin: "http://localhost:3000", // Next.js 前端地址
    credentials: true, // 允许跨域携带 cookie
  })
);

app.use(express.json());

// Session 配置
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 24小时
    },
  })
);

// 登录接口
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // 这里添加您的登录验证逻辑
    if (username === "test" && password === "password") {
      req.session.user = { id: 1, username };
      res.json({ success: true, user: { username } });
    } else {
      res.status(401).json({ success: false, message: "用户名或密码错误" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "服务器错误" });
  }
});

// 退出接口
app.post("/api/logout", (req, res) => {
  req.session.destroy();
  res.clearCookie("connect.sid");
  res.json({ success: true });
});

// 获取用户信息接口
app.get("/api/user", (req, res) => {
  if (req.session.user) {
    res.json({ success: true, user: req.session.user });
  } else {
    res.status(401).json({ success: false, message: "未登录" });
  }
});

// 添加服务器启动代码
const port = 4000;
app.listen(port, () => {
  console.log(`Express server running on port ${port}`);
});

module.exports = app;
