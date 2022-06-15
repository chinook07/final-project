# Jurassic Park Control Console: the Final Project

Welcome to my bootcamp final project! The summum of all the knowledge aquired during the last 12 weeks has carefully been processed into a full-stack application, using React.js, Node.js, MongoDB, and RESTful APIs.

## How do I setup the React app so I can give it a test run?

You will need to open two terminals, side by side.

### Terminal 1

1. Type `cd server`
2. Type `yarn install`
3. Type `yarn start`

### Terminal 2

1. Type `cd client`
2. Type `yarn install`
3. Type `yarn start`

Now open your browser on localhost:3000 (should be done automatically), and enjoy!

## It's not working.

Oh yes, I almost forgot. You'll need to create a .env file, place it in the server folder, and populate it with 3 things:

1. `MONGO_URI` with a key to your MongoDB workspace
2. `WEATHER_KEY` with a key to the OpenWeatherMap API
3. `PASS_SEC` with any key you choose in order to "salt" the encrypted passwords.

You'll also need to run `node batchImport`, with the terminal open in the server folder. This will bring all the data into your own MongoDB environment.

Now it should work!

## What are the features on this website?

Firstly, there are two types of users: regular ones, and those with extra clearance. Only the latter can modify the staff roser, thus hiring or firing employees, and toggle the habitat fences.

## What about the other features?

I was getting there. First, you have the home page which gives you a general look on the park's functional (or dysfunctional) aspects. The interactive map lets you access an exhibit page rapidly to fix a fence breach, shall that situation arise.

On the population page, staff can update the number of dinosaurs based on births and deaths in the park. Logs can also be made to keep track of when and by whom the habitats are visited, as well as when the drones feed the carniverous species who need attention. As a reminder, the vegetarian species don't have a Add feeding time option because they can look after themselves.

The Logs page is where staff can view all the... logs, chronologically.

Exhibit info gives some general info about the habitat.

Finally, the Visitors page allows staff to shut off or reopen access to a section deemed unsafe. This info can also be viewed on the home page's interactive map.

## Are the passwords sent over the server in a secure fashion?

Yes. We at Jurassic Park take cybersecurity very seriously since the pre-opening incidents we encountered with an unruly developper. As a result, passwords are encrypted with CryptoJS and are stored as such in the database. The only place where you will see all the raw passwords at once is in the data.js file, which are encrypted when batchImport is run.

## Is that the actual weather on the home page?

Yes. I call an OpenWeatherMap API to get the me the current weather conditions from Costa Rica's Cabo Blanco wildlife reserve, where some events from the Jurassic Park book took place. Unfortunately, Isla Nublar itself is not on any map due to safety concerns.

## Can I log in to check out the website?

Sure, how about you free the trex, while you're at it? But serioulsy, I want you to trust this application, and for that, I will trust you with two login accounts:

-   Al, password 123, has total security clearance.
-   Bob, same password, does not.

This will give the possibility to browse as if you were one of the employees using this app on a day-to-day basis.

## Isn't this project in bad taste? Weren't people killed in this park due to bad safety mechanisms?

While that is true, I thought it would be honouring [the victims](https://listofdeaths.fandom.com/wiki/Jurassic_Park) to design this application whilst correcting the problems that led to the initial tragedy.

## Which one of the 6 films is your favourite from the franchise?

At time of upload, I hadn't yet seen Jurassic World 3, Dominion, though I will be correcting that imminently. To this date, my favourite is the first and original Jurassic Park, though I enjoyed all the others.

## I'm lost. Is there a component tree where I can see your entire project at a glance?

When you're not logged in:

-   Header
-   Wrapper
    -   LogIn
    -   MoreInfo
-   Footer

Otherwise:

-   Header
-   Nav
    -   ChooseExhibit
-   Wrapper
    -   Home
        -   Vitals
        -   ParkMap
    -   Population
        -   LogForm
    -   Logs
    -   Exhibit/1 through Exhibit/6
        -   AreYouSure (high clearance only)
    -   Visitors
    -   Employees (high clearance only)
        -   AddUserForm
    -   MoreInfo
    -   Error
-   Footer
