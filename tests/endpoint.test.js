const request = require("supertest");
const assert = require("chai").assert;
const app = require("../server");
// const { sendDataToDB } = require("../server");
//Test Get Data endpoint
it("Should get the value of testKey from the database", async () => {
  let response = await request(app)
    .get("/v1/getValueFromKey?username=testUser&key=testKey")
    .set("Accept", "application/json")
    .expect("Content-Type", /text/)
    .expect(200);
});

// it("Should insert data to the database", async () => {
//   let response = await sendDataToDB({
//     testKey: "testValue",
//     user_id: "testUser",
//   });
//   console.log(response);
//   // let response = await assert.equal(
//   //   app.sendDataToDB({ testKey: "testValue", user_id: "testUser" }),
//   //   /json/
//   // );
// });
