// const { default: axios } = require("axios");

// var dd_options = {
//   "response-code": true,
//   tags: ["main: chat-test"],
// };

// var connect_datadog = require("connect-datadog")(dd_options);

/* eslint-disable prefer-arrow-callback */
/* eslint-disable quotes */
class Calendar {
  //do something with the data here
  constructor(schedule) {}
}

class Event {
  constructor(data) {
    this.startTime = data.startTime;
    this.endTime = data.endTime;
    this.description = data.description;
  }
}

class Day {
  constructor(name) {
    this.name = name;
    this.events = [];
    this.addEvent = (eventData) => {
      this.events.push(new Event(eventData));
    };
    this.orderEvents = () => {
      //go through events and sort them by start and end time
    };
  }
}

class Week {
  constructor(number) {
    this.days = [];
    this.addDay = (name) => {
      const day = new Day(name);
      this.days.push(day);
    };
  }
}

$(window).on("load", () => {
  console.log('document is ready!')
  const username = "codingnoob";

  const title = $("<h1>").text("Social Calendar");
  $("body").append(title);
  const calContainer = $(`<div id="cal-container">`);
  $("body").append(calContainer);
  const chatContainer = $(`<div id="chat-container">`);
  $("body").append(chatContainer);
  const msgContainer = $(`<div id="msg-container">`);
  $(chatContainer).append(msgContainer);
  const msgLine = $(`<div class="msg-line">`);
  $(msgContainer).append(msgLine);
  const chatForm = $(`<form id="chat-form" method="post">`);
  $(chatContainer).append(chatForm);
  const inputField = $(`<input id="chat-input" type="text">`);
  $(chatForm).append(inputField);

  const button = $('<button class="button">GET MESSAGE</button>');
  $(chatContainer).append(button);

  $(button).on("click", () => {
    axios("http://localhost:8126/chat")
      .then(({ data }) => {
        const index = Math.floor(Math.random() * data.length);
        const msgObj = data[index];
        const msgUsername = msgObj["created_by"];
        const msgText = msgObj.message;
        renderChatText(msgUsername, msgText);
      })
      .catch((err) => console.log("front end get error", err));
  });

  $(chatForm).on("submit", function (event) {
    event.preventDefault();
    // const csURL = "https://curriculum-api.codesmith.io/messages";
    // const proxyURL = 'https://cors-anywhere.herokuapp.com/';
    const chatSubmit = $(inputField).val();
    // const formData = new FormData();
    // formData.append('created_by', `${username}`);
    // formData.append('message', `${chatSubmit}`); // Why does form data return a CORS error?
    // postChat(csURL, formData);
    // const postObj = {
    //   headers: {
    //     "Content-Type": "application/json; charset=utf-8",
    //   },
    //   body: {
    //     created_by: username,
    //     message: chatSubmit,
    //   },
    // };
    // postChat(csURL, postObj);
    axios
      .post("http://localhost:8126/chat", {
        created_by: username,
        message: chatSubmit,
      })
      .then(
        axios("http://localhost:8126/chat")
          .then(({ data }) => {
            console.log("MESSAGE ARRAY", data);
            const index = Math.floor(Math.random() * data.length);
            const msgObj = data[index];
            const msgUsername = msgObj["created_by"];
            const msgText = msgObj.message;
            renderChatText(msgUsername, msgText);
          })
          .catch((err) => console.log("front end get error", err))
      )
      .catch((err) => console.error(err));
    renderChatText(username, chatSubmit);
  });
});




// async function postChat(url = "", dataObj = {}) {
//   await fetch(url, dataObj)
//   // fetch("https://cors-anywhere.herokuapp.com/https://curriculum-api.codesmith.io/messages", postObj)
//   .then(response => response.json())
//   .then(data => data)
//   .then(chatReponse(url))
//   .catch(err => err)
// };

// async function chatReponse(url) {
//   await fetch(url)
//   .then(response => response.json())
//   .then(msgArr => {
//     const index = Math.floor(Math.random() * msgArr.length);
//     const msgObj = msgArr[index];
//     let msgUsername = msgObj["created_by"];
//     let msgText = msgObj.message;
//     renderChatText(msgUsername, msgText);
//   })
// }

const renderChatText = (username, text) => {
  const msgLine = $(`<div class="msg-line">`);
  const msgUsername = $(`<div class="msg-username">`).text(username);
  const msgText = $(`<div class="msg-text">`).text(text);
  $(msgLine).append(msgUsername);
  $(msgLine).append(msgText);

  $("#msg-container").append(msgLine);
};

// fetch("https://curriculum-api.codesmith.io/messages", chatSubmitObj)
// .then(response => response.json())
// .then(data => console.log(data));
