Eigen Labs Work Trial
Senior Fullstack Engineer
OVERVIEW
First off, congratulations on advancing to the work trial stage for the Senior Fullstack Engineer
position here at EigenLayer! We are very excited that you are part of this process and are looking
forward to seeing and discussing your project work.
The work trial is a way for us to:
1. gauge your interest in the position
2. assess your design, technical abilities and thought process related to this role
3. see how much you can get up to speed on the EigenLayer ecosystem
DESCRIPTION
The Consumer team at EigenLayer is responsible for building out the programs, tools, and
services for our ecosystem of consumer apps and users powered by the EigenStack. These
applications are built using both traditional web2 development constructs like microservices,
frontends and databases but also use web3 functionality like interactions with the
blockchain/smart contracts and wallets.
Consider this work trial as part of your EigenEducation. You’ll become quite familiar with similar
data and terminology in a full-time role.
Also consider what can be accomplished in just a few hours. This is not meant to be an
exhaustive project. If something doesn’t work, so be it.
The goal of this work trial is to build a simple web-app for a user to claim rewards that
performs the following:
1. 2. 3. Users visiting the page will connect their wallet. The website will then display EIGENS
rewards earned by users, along with a CLAIM button that will prompt them to claim
their rewards.
The app determines if they have >= 1 one of the following tokens
○ ETH, UNISWAP , ARB, OP (You can just choose one to keep it simple)
If they do, the user will be shown a CLAIM button where they can Claim a certain
amount of EIGEN token rewards.
○ Determining the # of EIGEN rewards - EIGEN token rewards are matched 1:1
with each of the tokens above. For example, if a user has 1 ETH, 1 UNI, 1 ARB,
4. and 1 OP , then the user will be eligible to claim 4 EIGEN tokens.
Claim functionality - When a user clicks on claim, this should call out to the EIGEN mint
contract with the calculated EIGEN rewards sent to it by the user.
DELIVERABLES
1. 2. 3. 4. 5. 6. Smart contract for minting EIGEN tokens/incentives for eligible participants.
Frontend UI with easy to understand UX and ability to collect wallet (e.g metamask, etc)
Backend that Analyzes users wallet holdings to determine if they meet eligibility
criteria, and computes the EIGEN amount they can claim.
A functioning Github repository containing your work with source code
Dockerized deployment (Dockerfile in the repo) of the webapp, detailed README
instructions and documentation on how to run and test your service locally.
○ Please invite @NimaVaziri, @Gajesh2007, @dralves, @yurong99 &
@QuinnLee to your repo when completed
One hour presentation related to your work and findings which will be presented
during a follow up meeting with our team
○ (Optional) Slides and formal presentation.
○ Additional questions to ponder:
■ What constraints might you encounter in bringing your webapp to the
masses?
■ If you had more time, where would you take your dashboard?
■ What tradeoffs did you consider with the data you’re presenting?
■ What did you identify in the data that you found interesting?
■ How do we ensure users have confidence in the data?
Ideas to help you get started
● How do you pre-compute (continuously for each new ETH block) EIGEN rewards for
each wallet entered in the front ahead of time
● Use of blockchain data indexers/providers
● Retrieving Token holder information - You may use etherscan API for getting token
holder information to determine the values of their holdings for each token
● Frontend
○ Feel free to use an existing dashboard or frontend template/framework to build
out your frontend. This is not an exercise in the look and feel of a dashboard, grid
or web-app but rather what you learn and prioritize to present to us.
○ Use a major frontend framework like React or Vue.
● Backend: You can use Golang or NextJS or any other framework you like.
Bonus (Optional)
● Use of tamper data proof co-processors for blockchain data (e.g Brevis, Lagrange,
space & time, Axiom, etc)
Feel free to research and implement additional functionality or a completely different
architecture. Simply back up your ideas with a solid rationale. Thank you for your time.
E-mail yurong@eigenlabs.org with any questions or to hop on a call