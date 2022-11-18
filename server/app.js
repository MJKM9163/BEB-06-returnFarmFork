import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import { sequelize } from "./models/index";
import router from "./src/router";
// import { create } from "ipfs-http-client";

const PORT = process.env.PORT || 4000;

// * ------------ data base ------------ *

sequelize
  .sync({ force: false }) //기존데이터유지
  .then(() => {
    console.log("데이터 베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

const app = express();
const corsOption = {
  origin: "http://localhost:3000",
  methods: "POST,PUT,DELETE,GET",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOption));
app.use(express());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

// * ------------ server 및 router ------------ *
// npm i ipfs-http-client@56.0.2
// const ipfs = create("/ip4/127.0.0.1/tcp/5001");
// const imgUpload = async (img) => {
//   if (!Buffer.isBuffer(img)) return null;
//   const addFile = await ipfs.add(img);
//   const initUri = "https://ipfs.io/ipfs/";
//   const mkUrl = initUri + addFile.cid;
//   return mkUrl;
// };

// 서버 생성
const webServer = createServer(app);
// 서버 - 소켓 연결
const io = new Server(webServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

webServer.listen(PORT, () => console.log(` Server is running on ${PORT}`));

// * ------------ socket ------------ *

let users = [];

// socket.이벤트 - client 전송
// io.이벤트 - server 전송
io.on("connection", (socket) => {
  // 소켓 연결 알림
  console.log(`${socket.id} 유저가 소켓에 연결되었습니다!`);
  socket.on("loginUser", (nickName) => {
    users.push(nickName);
    io.emit("newUserResponse", users);
  });

  socket.on("message", (data) => {
    io.emit("messageResponse", data);
  });

  // 소켓 연결 해제
  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
    users = users.filter((user) => user.socketID !== socket.id);
    // 유저 이탈 시 채팅 참가 목록에서 제외 코드 작성하기
    io.emit("newUserResponse", users);
    socket.disconnect();
  });
});
