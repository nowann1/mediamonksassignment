![image](https://user-images.githubusercontent.com/79383025/110695405-9baa3e80-81c8-11eb-922f-89f0af53fc95.png)


<h1 align="center">⛩️ Mediamonks Assignment ⛩️</h1>

# Description

<p>This project was made for MediaMonks by Nahuel Ladeda.</p>

## What you should know

 - Be sure to have Node up to date (I've used Node v15.9.0 for this project) 
 - Run ```npm install``` to install all dependencies.
 - Run ```npm start``` to start the server
 - Go to ```http://localhost:4000/``` to use the service
 - If you only want to use the endpoint ( although is accesible through the Request Page, by pressing the GET button) go to ```http://localhost:4000/v1/getValueFromKey?username=<username>&key=<key>``` and replace ```<username>``` with the username that you just use to make the request, and ```<key>``` with the key of the request you just made.
 - Run ```npm test``` to test the endpoint

### Features

- Monk List: Shows all the monks online in the page.
- Query List: Shows all the queries that you and other monks are making.

This is the login page, a simple login that only takes your username (also it doesn't fit with the Request Page, not the best stylistic choice)
![image](https://user-images.githubusercontent.com/79383025/110695025-22aae700-81c8-11eb-8dfb-da63c51cc767.png)


This is the Request Page, this is what you should see once you login, it's quite intuitive.
![image](https://user-images.githubusercontent.com/79383025/110696205-8f72b100-81c9-11eb-899f-de7782458b17.png)



### Database

I went straigth to NoSQL and used FireStore as my database, after testing MongoDB and having much slower results.

This is the structure of the database
![image](https://user-images.githubusercontent.com/79383025/110696352-bd57f580-81c9-11eb-8dcd-5de95a1e71f3.png)


### About Me!

Hi! My name is Nahuel Ladeda, i'm 22 years old, and i love programming 💻 , making music 🎹 and cats! 🐱

