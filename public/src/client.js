const socket = io();
const requestPageMM = document.getElementById("request-form");
const userList = document.getElementById("user-list");

const { username } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const page = "page";

document.getElementById("user").innerHTML = username;

function showEndpoint(option) {
  if (option == 0) {
    document.getElementById("btnEndPoint").style.display = "none";
    document.getElementById("btnRequest").disabled = false;
  } else {
    document.getElementById("btnEndPoint").style.display = "block";
    document.getElementById("btnRequest").disabled = true;
  }
}

socket.on("roomUsers", ({ users, page }) => {
  outputUsers(users);
});

//Message from Server
socket.on("message", (message) => {
  console.log("Request Data Response: " + message.text);
  outPutResponse(message);
});

//Join RequestPage
socket.emit("joinPage", { username, page });

//When a request is made
requestPageMM.addEventListener("submit", (e) => {
  e.preventDefault();
  try {
    let reqData = e.target.elements.txtValue.value;
    let user = username;
    reqData = "{" + reqData + ',"user_id": "' + user + '"}';
    JSON.parse(reqData);
    console.log("Request Data: " + reqData);

    //Send message to server
    socket.emit("requestData", reqData);
  } catch (e) {
    outPutError(
      'Invalid data in request, be sure to use this format "key":"value"'
    );
  }
});

function outPutError(message) {
  document.getElementById("request-response").value = message;
}

function outPutResponse(message) {
  if (message.text == undefined) {
    document.getElementById("request-response").value += "\n" + message;
  } else {
    document.getElementById("request-response").value +=
      "\n" +
      "[ " +
      message.time +
      " ] " +
      message.username +
      ": " +
      "\n" +
      message.text;
  }
}

//Get page and users
socket.on("pageUsers", ({ users }) => {
  outputUsers(users);
});

function outputUsers(users) {
  userList.innerHTML = "";
  users.forEach((user) => {
    const li = document.createElement("li");
    li.style.fontSize = "22px";
    li.style.letterSpacing = "1px";
    li.style.marginLeft = "25px";
    li.innerText = "  " + user.username;
    userList.appendChild(li);
  });
}

function goToEndPoint() {
  let urlRequest = `http://localhost:4000/v1/getValueFromKey?username=${username}&key=`;
  window.open(urlRequest, "_blank");
}
