const express = require("express");
const cors = require("cors");
const session = require("express-session");
const userRoutes = require("./routes/userRoutes");

let app = express();

// CORS 配置
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
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

app.use("/api/v1", userRoutes);

// 添加服务器启动代码
const port = 17903;
app.listen(port, () => {
  console.log(`Express server running on port ${port}`);
});

module.exports = app;
