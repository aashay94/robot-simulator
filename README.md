# Introduction

This project implements a simulator for a small robot named Sally. Sally can
move forward and turn left and right. Sally's objective is to find the goal on
the map.

Our goal is not only to evaluate your coding abilities, but also to get a feel
for how you pick up unfamiliar projects, prioritize work, and communicate your
decisions with peers. The code in this repo is intentionally imperfect, but
functional. The purpose is to provide an example of a real world product, warts
and all.

Your task is to familiarize yourself with the code, review the backlog of tasks,
choose one or more projects, and complete them within a limited time period. We
typically ask for two 2 hours, but please let us know if you cannot devote that
much time or would like to spend more time on it.

After the time period is up, we will walk through your changes with you and
discuss what changes you made, why you made them, and what else you thought
about while working on the project.

As you work on your project, please take the opportunity to note anything you
think could be improved and improved, and either fix it or let us know why you
decided not to.

**Note:** This is an open ended project, we are evaluating you on your ability
to organize and communicate as much as on your coding abilities. We ask that you
spend about two hours on the project, but you are welcome to spend more time on
it if you want. This is your chance to "wow" us, so please put in your best
effort. As such, the time limit in HackerRank is set to allow you a full week to
work on it. This is _not_ an expectation of how much time you should spend on
this. It is possible you will not be able to complete your chosen task(s) in the
time you have. _This is fine_. Do your best, and be prepared to discuss what
worked and what didn't. If you get stuck and want to ask for guidance or help it
won't count against you.

# Steps

1. Familiarize yourself with the code
2. Familiarize yourself with the backlog
3. Select one or more projects off the backlog
4. Implement changes\
   **NOTE**: Please do _not_ create a Pull Request - just commit directly back
   to the master branch. We realize a PR is best practice, but our support
   tools don't love PRs yet. 
5. Review and discuss changes with us


# Backlog

_Note_: this is _not_ a sorted priority list.

- Clean up the redundant code in `Robot.move`
- Support Multiple Robots
- Add walls to block robot motion
- Use [blueshell](https://www.npmjs.com/package/blueshell) to enhance the AI to
  find the goal
- Replace canvas view with PixiJS (or another graphics package)
  - Add ability to change grid dimensions
  - Add smooth motion rendering as the robot moves
- Port the code to Angular (or another framework)
- Port to Typescript
- Other enhancements?

## Unit Tests and Automatic Scoring

Some of the backlog items above have unit tests written for them.

- `base-input-view-commands.spec.js` will make sure some basic built-in commands
  from the base code still work
- `stepai-completion.spec.js` will test the ability of `STEPAI` to find the goal
  - If you choose to implement walls as well, be sure to look into this test so
    that it doesn't unfairly decrease your score since `STEPAI` can take more
    steps if there are walls in the way

You are not required to work on specific backlog items, and should not worry
about the tests failing if you didn't work on the related backlog items. The
automated scoring is just a helper item. Your primary evaluation will be on
personal review of your code, not on the results of the automation.

You are encouraged to write new unit tests for any backlog items you address.

# NodeJS Development Crash Course

If you are new to NodeJS development, here's a crash course that should get you started:

Install nodejs for your platform (there are various ways to do this):

- Mac with Homebrew - `brew install node`
- Everything else - <https://nodejs.org/en/download/>

Once Node is installed, in the repo's directory run the following on the command
line:

- `npm install`
- `npm start`

Now that the app server is running, open a web browser and go to
<http://localhost:8000/webpack-dev-server/> and you should see the project. Any
code changes to the JS files will automatically be served up and the web page
will reload, so you can test in realtime. When you're done, you can `Ctrl-C` the
terminal running `npm start` to stop the server.

To run the unit tests:

- `npm run test` or `npm test`

# Sally

![Sally the Robot](https://robohash.org/sally?raw=true)
