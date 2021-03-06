// A sort of readme file.

import styled from "styled-components";

const MoreInfo = () => {
    return (
        <>
            <Main>
                <h1>More info</h1>
                <p>Welcome to my bootcamp final project! The summum of all the knowledge aquired during the last 12 weeks has carefully been processed into a full-stack application, using React.js, Node.js, MongoDB, and RESTful APIs.</p>
                <div>
                    <h2>How do I setup the React app so I can give it a test run?</h2>
                    <p>You will need to open two terminals, side by side.</p>
                    <h3>Terminal 1</h3>
                    <ol>
                        <li>Type <Code>cd server</Code></li>
                        <li>Type <Code>yarn install</Code></li>
                        <li>Type <Code>yarn start</Code></li>
                    </ol>
                    <h3>Terminal 2</h3>
                    <ol>
                        <li>Type <Code>cd client</Code></li>
                        <li>Type <Code>yarn install</Code></li>
                        <li>Type <Code>yarn start</Code></li>
                    </ol>
                </div>
                <div>
                    <h2>It's not working.</h2>
                    <p>Oh yes, I almost forgot. You'll need to create a .env file, place it in the server folder, and populate it with 3 things:</p>
                    <ol>
                        <li><Code>MONGO_URI</Code> with a key to your MongoDB workspace</li>
                        <li><Code>WEATHER_KEY</Code> with a key to the OpenWeatherMap API</li>
                        <li><Code>PASS_SEC</Code> with any key you choose in order to "salt" the encrypted passwords</li>
                    </ol>
                    <p>You'll also need to run <Code>node batchImport</Code>, with the terminal open in the server folder. This will bring all the data into your own MongoDB environment.</p>
                    <p>Now it should work!</p>
                </div>
                <div>
                    <h2>What are the features on this website?</h2>
                    <p>Firstly, there are two types of users: regular ones, and those with extra clearance. Only the latter can modify the staff roser, thus hiring or firing employees, and toggle the habitat fences.</p>
                </div>
                <div>
                    <h2>What about the other features?</h2>
                    <p>I was getting there. First, you have the home page which gives you a general look on the park's functional (or dysfunctional) aspects. The interactive map lets you access an exhibit page rapidly to fix a fence breach, shall that situation arise.</p>
                    <p>On the population page, staff can update the number of dinosaurs based on births and deaths in the park. Logs can also be made to keep track of when and by whom the habitats are visited, as well as when the drones feed the carniverous species who need attention. As a reminder, the vegetarian species don't have a <Code>Add feeding time</Code> option because they can look after themselves.</p>
                    <p>The Logs page is where staff can view all the... logs, chronologically.</p>
                    <p>Exhibit info gives some general info about the habitat.</p>
                    <p>Finally, the Visitors page allows staff to shut off or reopen access to a section deemed unsafe. This info can also be viewed on the home page's interactive map.</p>
                </div>
                <div>
                    <h2>Are the passwords sent over the server in a secure fashion?</h2>
                    <p>Yes. We at Jurassic Park take cybersecurity very seriously since the pre-opening incidents we encountered with an unruly developper. As a result, passwords are encrypted with CryptoJS and are stored as such in the database. The only place where you will see all the raw passwords at once is in the data.js file, which are encrypted when batchImport is run.</p>
                </div>
                <div>
                    <h2>Is that the actual weather on the home page?</h2>
                    <p>Yes. I call an OpenWeatherMap API to get the me the current weather conditions from Costa Rica's Cabo Blanco wildlife reserve, where some events from the Jurassic Park book took place. Unfortunately, Isla Nublar itself is not on any map due to safety concerns.</p>
                </div>
                <div>
                    <h2>Can I log in to check out the website?</h2>
                    <p>Sure, how about you free the trex, while you're at it? But serioulsy, I want you to trust this application, and for that, I will trust you with two login accounts:</p>
                    <ul>
                        <li>Al, password 123, has total security clearance.</li>
                        <li>Bob, same password, does not.</li>
                    </ul>
                    <p>This will give the possibility to browse as if you were one of the employees using this app on a day-to-day basis.</p>
                </div>
                <div>
                    <h2>Isn't this project in bad taste? Weren't people killed in this park due to bad safety mechanisms?</h2>
                    <p>While that is true, I thought it would be honouring <LinkExt href="https://listofdeaths.fandom.com/wiki/Jurassic_Park" target="blank">the victims</LinkExt> to design this application whilst correcting the problems that led to the initial tragedy.</p>
                </div>
                <div>
                    <h2>Which one of the 6 films is your favourite from the franchise?</h2>
                    <p>At time of upload, I hadn't yet seen Jurassic World 3, Dominion, though I will be correcting that imminently. To this date, my favourite is the first and original Jurassic Park, though I enjoyed all the others.</p>
                </div>
                <div>
                    <h2>I'm lost. Is there a component tree where I can see your entire project at a glance?</h2>
                    <p>Yes, please go to <LinkExt href="https://github.com/chinook07/final-project/blob/main/README.md" target="blank">the readme file on the GitHub page</LinkExt>.</p>
                </div>
            </Main>
        </>
    )
}

const Main = styled.main`
    h2 {
        font-size: 22px;
        margin-bottom: 12px;
    }
    h3 {
        font-size: 16px;
        margin: 12px 0;
    }
    ol {
        list-style-position: inside;
    }
    ul {
        list-style-position: inside;
        list-style-type: square;
    }
`

const Code = styled.span`
    font-family: monospace;
`

const LinkExt = styled.a`
    color: var(--c-yellow);
`

export default MoreInfo;