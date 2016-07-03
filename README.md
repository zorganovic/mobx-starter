# React + Mobx Quick Starter project

The goal of this project is to provide a starting base for an mobx react project with OPTIONAL isomorphism.

Features:
+ `async/await` support
+ Isomorphic
+ CSS and SCSS compilation
+ MongoDB user auth / sessions
+ Decorators for accessing actions and state

Coming soon:
+ Hot reload _(broken atm)_


## How to run

For development:

    npm run dev

For production:

    npm run prod

## Goals

We have one state object. That object can be accessed by any React component decorated with `@connect`.

If we want to update the state, we execute `actions` which are just namespaced functions _(namespace = action filename)_ that affect the state.

All the rendering is efficiently taken care by [MobX](https://github.com/mobxjs/mobx) so you can focus on two things:

`What to name your action?` and `what should it do?`

## Author

Ryan Megidov

https://github.com/nightwolfz/mobx-starter
