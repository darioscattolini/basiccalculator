# Basic calculator
> A simple calculator for performing the basic arithmetical operations. 

## General info
This is the second JavaScript app I developed, in October 2019. It's a calculator that performs the four basic arithmetical operations (addition, substraction, multiplication and division). Operations are performed in successive order, disregarding arithmetical precedence rules.
During the development I learned about the issues with floating-point numbers in JavaScript, and how to use [npm](https://www.npmjs.com/) libraries and packages to avoid reinventing the wheel in complex issues. I also learned about the need to test the app's reactions to unexpected users' behaviours (adding multiple floating points, pressing two equal or different operators, etc.).

## Latest update
In December 2019, by then more familiar with best practices, I improved the code in order to include the project in my portfolio. The main changes where:
* Corrected a bug in the calculation and display of rounded and too large results.
* Made minor refactoring of JS code.
* Added more detailed and consistent comments in main.js.
* Removed unnecesary README information from index.html and added a footer.
* Redesigned layout to make it compatible with different devices (although not responsive).
* Added README.md file.
* Added LICENCE.txt file.

## Built with
* HTML
* CSS (using CSS Grid for the calculator interface)
* JavaScript (ES6)
* [bignumber.js](https://www.npmjs.com/package/bignumber.js) library to deal with overflows and floating point imprecision.

## Status
_in progress_ Features to be added:
* Performing operations according to arithmetical precedence order. 
* A display for the full operation (and not just the last number) being built.
* Parentheses for customizing precedence order.
* New operations.

## Try it!
This is the link to the deployed version: [https://darioscattolini.github.io/basiccalculator/](https://darioscattolini.github.io/basiccalculator/)

## Inspiration
This project is the solution to an assignment I was given in the programming lessons I took during October and November at [Cibernárium](https://cibernarium.barcelonactiva.cat/) in Barcelona. It was the first excercise that asked us to build a truly useful application, so I decided to upload it here. 

## Contact
Created by [Darío Scattolini](https://darioscattolini.github.io). Feel free to contact me!

## License
[Copyright 2019 Darío Scattolini - MIT License](./LICENSE.txt])