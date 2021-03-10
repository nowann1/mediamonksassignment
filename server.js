const socketio = require("socket.io");
const http = require("http");
const express = require("express");
const path = require("path");
const admin = require("firebase-admin");
const {
  userJoin,
  getCurrentUser,
  getUsersInPage,
  userLeave,
} = require("./utils/users");
const dotenv = require("dotenv");
const formatMessage = require("./utils/messages");
const serviceAccount = require("./admin/mediamonks-assignment-d25205aa3a70.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();
var PORT = process.env.PORT || 4000;
const server = http.createServer(app);
const io = socketio(server);
dotenv.config();

server.listen(PORT, () => {
  console.log("Listening on port http:/localhost:" + PORT);
});

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  socket.on("joinPage", ({ username, page }) => {
    const user = userJoin(socket.id, username, "page");
    socket.join(user.page);
    console.log("New Client Connection...");

    socket.broadcast
      .to(user.page)
      .emit("message", user.username + " has joined the page");

    io.to(user.page).emit("pageUsers", {
      users: getUsersInPage(page),
    });

    socket.on("disconnect", () => {
      const user = userLeave(socket.id);
      if (user) {
        console.log("USER " + JSON.stringify(user.username) + " DISCONNECTED");

        socket.broadcast
          .to(user.page)
          .emit("message", user.username + " has left the page");
        io.to(user.page).emit("pageUsers", {
          users: getUsersInPage(user.page),
        });
      }
    });

    //Listen for requests
    socket.on("requestData", async (reqData) => {
      const user = getCurrentUser(socket.id);

      //Receives data from client's request
      let response = await sendDataToDB(reqData).catch(console.dir);

      //Sends a response to client
      console.log("response: ", response);

      io.emit("message", formatMessage(user.username, response));
      if (reqData == undefined) {
        io.emit("message", formatMessage(username, "404 Not Found"));
      } else if (reqData != undefined) {
      }
    });
  });
});

async function sendDataToDB(reqData) {
  try {
    reqData = JSON.parse(reqData);
    const docRef = db.collection("users").doc(reqData.user_id);
    delete reqData.user_id;
    let result = await docRef.set({ reqData }, { merge: true });

    console.log(result);
    return JSON.stringify(result);
  } finally {
  }
}

async function getDataFromDB(username, key) {
  const userData = db.collection("users").doc(username);
  const doc = await userData.get();
  if (!doc.exists) {
    return "404 Not Found";
  } else if (doc.data().reqData[key] != undefined) {
    console.log();
    console.log(doc.data());
    return doc.data().reqData[key];
  } else {
    return "404 Not Found";
  }
}

app.get("/v1/getValueFromKey", async (req, res) => {
  let username = req.query.username;
  let key = req.query.key;

  let response = await getDataFromDB(username, key);
  console.log(response);
  if (response == "404 Not Found") {
    res.sendStatus(404);
  } else {
    res.send(response).status(200);
  }
});

(module.exports = app), sendDataToDB;
// module.exports = sendDataToDB;
