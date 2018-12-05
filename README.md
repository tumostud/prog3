# GoF - Final Project | Programming 3

An in-depth documentation of the *GoF* project. Some small tips are also set on both index.html and stats.html pages.

### Table of Content:
  - [Description](#description)
  - [Features](#features)
  - [Characters](#characters)
  - [Stats Details](#stats-details)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Issues](#issues)
  - [Thanks](#thanks)

## Description:
This is a customized version of the original *Game of Life*, which is an infinite game, it contains characters which move, eat, multiply, die in different circumstances.

It is built with **Vanilla JavaScript**, while also using a library called **P5.js** for the canvas, Frame Seconds etc. Classes, methods, functions are used throughout the code. Code is organized in different files and there is also a server set up for staistics using **Node.js**, **Express** and **Socket.io**.

It mostly doesn't have any user interaction, but for this customized version, you can check some stats throughout the game and interact a bit with it.

## Features
 1. **Infinite Game**: This game goes on infinitely.
 2. **Clean code**: Code is organized in different files, formatted correctly and commented mostly everything throughout the code. Additionally, the commits are self-explanatory and well described.
 3. **Weather**: Weather changes constantly by changing the seasons. The title changes as the seasons change, the background of the page changes, also the *Grass* color depending on the weather.
 4. **Unique Situation**: As a unique situation, if you click on a *Grass Eater* (yellow), it changes to a *Grass Eater Eater* (red) and vice versa. An issue about this feature is written [here](#issues).
 5. **6 Characters**: See the characters and its details [below](#characters).
 6. **Genders**: *Grass Eaters* have genders. If a female finds a male *Grass Eater*, then they breed and a new *Grass Eater* is born. An issue about this feature is written [here](#issues).
 7. **Statistics**: One of the best and most interesting features. It collects and sends some statistics to the server and provides basic stats to the client in the stats page. An issue about this feature is written [here](#issues).

## Characters
### Living Creature:
This is the main Class (character), but it is not an actual character, it contains the main constructor and methods which every character has.

### Grass:
This is the first and I think the main character. Though it doesn't do much. It just multiplies and dies if a *Grass Eater* eats it. Features include:
  - Multiply.
  - Die.

### Grass Eater:
*Grass Eater* is a character which eats *Grass* if it encounter any in its direction radius. Features include:
  - Move.
  - Eat.
  - Mult (has genders).
    - On Winter it multiplies less.
    - On Summer it multiplies a bit more.
    - On Spring and Autumn it multiplies regularly.
  - Die

### Grass Eater Eater:
*Grass Eater Eater* is a character which eats *Grass Eater* if it encounters any in its direction radius. Features include:
  - Move.
  - Eat.
  - Mult.
    - On Spring it multiplies more than usual.
    - On Autumn it multiplies a bit less.
    - On Winter and Summer it multiplies regularly.
  - Die.
  
### Bomber:
*Bomber* is a bomb which has 2 direction radiuses, wide and narrow, depending on the season (weather). It kills any character in its explosion radius. Features include:
  - Move.
    - On Winter and Spring the *Bomber* will Move One Step
    - On Summer and Autumn the *Bomber* will Move Two Steps
  - Explode.
    - On Winter and Spring the explosion radius will be small
    - On Summer and Autumn the explosion radius will be bigger
  - Die
 
### Bomber Generator:
*Bomber Generator* is a character which generates bombs. Features include:
  - Move.
    - On Winter and Spring the *Bomb Generator* will generate bombs when the energy number is divisible by 5 (will generate less).
    - On Summer and Autumn the *Bomb Generator* will generate bombs when the energy number is an odd number (will generate more).
  - Mult.
  - Die.
  
### Bomber Destroyer:
*Bomber Destroyer* is a character which kills bombs when found in their direction radius. Features include:
  - Destroy.
  - Move.
  - Die.
Note: Weather changes are not supported for this character.


For more info on *Bomber*, *Bomber Generator* and *Bomber Destroyer* characters, check out this [doc](https://docs.google.com/document/d/1Tmo--fDljEZ0i0kkeEc64BHaq-OzHe-B8I9SUsdMqeg/edit).


## Stats Details
These are the stats sent to the server and shown to the client:
- **Timestamp**: The moment the stats are sent.
- **grassSpawn**: The numbers of *Grasses* spawned.
- **grassEaterSpawn**: The numbers of *Grass Eaters* spawned.
- **grassEaterEaterSpawn**: The numbers of *Grass Eater Eaters* spawned.
- **bombSpawn**: The numbers of *Bombs* spawned.
- **bombGeneratorSpawn**: The numbers of *Bomb Generators* spawned.
- **bombDestroyerSpawn**: The numbers of *Bomb Destroyers* spawned.
- **Weather**: The name of the season at the moment that the stat is sent.
- **geTogee**: The number of times you clicked on a *Grass Eater* and turned it into a *Grass Eater Eater* (yellow to red).
- **geeToge**: The number of times you clicked on a *Grass Eater Eater* and turned it into a *Grass Eater* (red to yellow).

Stats starts and is shown on the page from oldest to newest. It's set with a *counter title* so you won't get lost between all the stats!

## Installation

```
cd Desktop
git clone https://github.com/tumostud/prog3.git
cd prog3
npm-install OR npm-update
node app.js
```

## Usage
After cloning the repo, open:

```
http://localhost:3000/
```

and

```
http://localhost:3000/stats.html
```

Enjoy the game!!! :D

## Issues
- *Genders* feature is finally implemented, but it needs at least 10 *Grass Eaters* to be spawned initially on load for the breeding process to happen. So, if only few of them spawn on load they would die quickly, so refreshing would help to spawn more of them on load
- It's nor a mistake from my side nor a bug I think, but sometimes the stats may have some lag till writing to the file if the game runs for a long time and starts to lag. So, you can see the same stats in the stats page for few times till the new stats gets written to the file and shown to you.
  - Workaround: Keep both the index.html and stats.html at the same time, while keeping the data.json file open in the text editor (for ex. VS Code) to check if it works correctly and smoothly.
- For *unique situations* feature, after a while, the game may start to lag and you won't see the changes immediately. Additionally, there is a console.log() in the code, which prints some text in the console when you click on one of the characters (when you're in doubt).

## Thanks
**_Thanks_** to the workshop leaders for teaching us some advanced **JS**, **Node.js**, **NPM** and some if its frameworks throughout the Programming 2 and 3 workshops. It will help to advance my career and further learn more advanced **JS**, **Node.js** in depth and become a **_Full-Stack Developer_**.

I know that there could be a bug or two (or many!) in the code, but I hope that I pass the Programming 3 course, as I worked hard on this project while I had university exams and also work after uni.

**Thanks again!!**