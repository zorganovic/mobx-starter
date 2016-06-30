# React + Mobx Quick Starter project

The goal of this project is to provide a starting base for an mobx react project with OPTIONAL isomorphism.

Features:
+ `async/await` support
+ Hot reload
+ Isomorphic
+ CSS and SCSS compilation
+ MongoDB user auth / sessions
+ Decorators for accessing actions and state

## How to run

For development:

    npm run dev

For production:

    npm run prod

## Goals

This project is trying to emulate Flux/Redux's unidirectional flow in a different way.

In the case of redux, you have actions, a dispatcher and reducers.

Here we just have actions, which are just namespaced functions _(namespace = action filename)_ that affect the state.

All the re-rendering is efficiently taken care by [MobX](https://github.com/mobxjs/mobx) so you can focus on two things:

`What to name your action?` and `what should it do?`

## Author

Ryan Megidov

https://github.com/nightwolfz/mobx-starter
