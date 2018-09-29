# Lab2-JQuery
First take the <a href="https://www.khanacademy.org/computing/computer-programming/html-css-js/html-css-js-intro/e/quiz--javascript-recap">Khan quiz</a> to make sure you know basic javascript. In this assignment you will implement a jquery ajax call to get the current weather. 

![Example of Weather Page](Screen%20Shot%202015-02-20%20at%202.05.21%20PM.png)

You should put your html file in html/lab2/weather.html .  You can rename the github clone to this location.

The weather section should do the following:

1) Allow the user to type characters into a form. With each keystroke, query a <a href="http://bioresearch.byu.edu/cs260/jquery/getcity.cgi?q=Pr">REST service</a> that will return a list of cities in utah that have those characters as a prefix. This will provide a hint to the user as to what legal values can be. Put these options into a list. These [hints](https://github.com/BYUCS260/Lab2-JQuery/wiki/Getting-Suggestions-to-Work) may be helpful.

2) When the user selects the submit button, take the entry from the form and put it into the CITY box on the page. These [hints](https://github.com/BYUCS260/Lab2-JQuery/wiki/Getting-Submit-to-Work) may be helpful.

3) The submit button will also query the <a href="https://openweathermap.org/api">Open Weather REST Service</a> to get the current weather for that city. These [hints](https://github.com/BYUCS260/Lab2-JQuery/wiki/Connecting-to-OpenWeather) may be helpful.

4) You must also add a section where a user can type a word into an input field, with a button that will query the [StackExchange REST service](https://api.stackexchange.com/docs/search) for questions with the word in the topic.  For example, if the user had entered "javascript" in the form, then you would create the following REST request

```
https://api.stackexchange.com/2.2/search?order=desc&sort=activity&intitle=javascript&site=stackoverflow
```

#### Grading:

- Grading is based on the following table (subject to change):

Behavior | Approximate Points
--- | ---
You have the basic layout and parts of the application | 25
Your application correctly suggests cities based on the input value | 20
A User can search for an inputed city's weather | 20
A User can search Stack Exchange for an inputed word | 25
Your page looks really good. This is subjective, so wow us. | 10

