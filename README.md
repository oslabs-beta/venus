#Calendar

##Goal
The goal of this challenge is to create your own personal calendar. The content of your calendar can be accessed through the global variable "schedule"; use javascript, HTML, and CSS to render the content onto your page. You will be using this calendar for the next two weeks, so make it pretty!

##How do I get started
1. After forking and cloning this repo (see the [previous challenge's README.md](https://github.com/CodesmithLLC/w1-s1-fs-fundamentals) if needed), run the following command in your terminal:
  ````
  npm install
  ````
1. To install front-end essential libraries (also called dependencies), run the following command:
  ````
  bower install
  ````

1. Complete the challenge by adding code to client/main.js file

  - The schedule is found in the global variable schedule which can be accessed as such:
  ````
  console.log(schedule);
  ````

  - The following two commands will be instrumental:
  ````
  document.body.appendChild(<custom node>);
  document.createElement(<element type>);
  ````

1. View your page by opening the index.html page in your browser. Style the page accordingly.

##How do I test if my answer is correct?
Previous, we ran tests in the browser (we opened an index.html). In production though, we often run test in the terminal. To run tests in the terminal for this challenge, type the following code:
````
npm test
````