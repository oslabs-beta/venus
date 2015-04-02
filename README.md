#Calendar

##Goals
Javascript is the primary language that allows developers to interact directly with the browser (also known as the Document Object Model or DOM, for short). Without it, rich web apps such as Gmail and Facebook that have elements on the page that are constantly changing would not be possible. The following sprint will teach you the basic javascript functions to get you started building your dynamic web apps.

The goal of this sprint is to create your own personal calendar. The content of your calendar can be accessed through the global variable "schedule"; use javascript, HTML, and css to render the content onto your page. You will be using this calendar everyday through the program, so make it perfect!

##How do I get started
1. After forking and cloning this repo (see the [previous sprint's README.md](https://github.com/CodesmithLLC/w1-s1-lowdash) if needed), run the following command in your terminal:
````
npm install
````

2. Work code src/main.js file
  - The schedule is found in the global variable schedule which can be accessed as such:
  ````
  console.log(schedule);
  ````
  -The following two commands will be instrumental:
  ````
  document.body.appendChild(<custom node>);
  document.createElement(<element type>);
  ````

##How do I test if my answer is correct?
Run the following code in your terminal to test your code:
````
npm test
````