//MANUAL TESTING
const admin = require("firebase-admin");
const express = require("express");

const serviceAccount = require("../admin/mediamonks-assignment-d25205aa3a70.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

var app = express();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log("Press Ctrl+C to quit.");
});

console.log(`App listening on port ${PORT}`);
// app.use(express.static(path.join(__dirname, "public")));

const docRef = db.collection("users").doc("alovelace123");

app.get("/v1/test", async (req, res) => {
  // console.log('Cookies: ', req.cookies)
  // console.log('Signed Cookies: ', req.signedCookies)

  var result = await setData();
  if (result == "404 Not Found") {
    res.sendStatus(404);
  } else {
    res.send(result).status(200);
  }
});

app.get("/v1/test1", async (req, res) => {
  // console.log('Cookies: ', req.cookies)
  // console.log('Signed Cookies: ', req.signedCookies)

  var result = await setData2();
  console.log("HOLA: " + result);
  res.send("SUCCESS!: " + result).status(200);
});

app.get("/v1/test2", async (req, res) => {
  // console.log('Cookies: ', req.cookies)
  // console.log('Signed Cookies: ', req.signedCookies)

  var result = await getData();
  //   console.log("SUCCESS: " + result);
  console.log("HOLA: " + result);
  res.send(result).status(200);
});

app.get("/v1/test3", async (req, res) => {
  // console.log('Cookies: ', req.cookies)
  // console.log('Signed Cookies: ', req.signedCookies)

  var result = await getData1();
  //   console.log("SUCCESS: " + result);
  console.log("HOLA: " + result);
  res.send(result).status(200);
});

app.get("/v1/getData", async (req, res) => {
  // console.log('Cookies: ', req.cookies)
  // console.log('Signed Cookies: ', req.signedCookies)
  var username = req.query.username;

  var result = await getDataFromUser(username);
  //   console.log("SUCCESS: " + result);
  console.log("HOLA: " + result);
  res.send(result).status(200);
});

async function getDataFromUser(username) {
  const userData = db.collection("users").doc(username);
  const doc = await userData.get();
  if (!doc.exists) {
    console.log("No such document!");
    return "No such document!";
  } else {
    console.log("Document data:", doc.data());
    console.log("Document data2:", Object.keys(doc.data()));
    return doc.data().middle;
  }
}

async function getData() {
  const snapshot = await db.collection("users").get();
  return snapshot.forEach((doc) => {
    console.log(doc.id, "=>", doc.data());
  });
}

async function getData1() {
  const snapshot = await db.collection("users").get();
  return snapshot.forEach((doc) => {
    console.log(doc.id, "=>", doc.data());
  });
}

async function setData() {
  return await docRef.set({
    Reqdata: {
      test: "value",
    },
  });
}
