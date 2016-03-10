# React + Mobx Quick Starter project

The goal of this project is to provide a starting base for an mobx react project with OPTIONAL isomorphism.

Features:
+ A structure
+ `async/await` support
+ Webpack middleware
+ Optional Isomorphism/Universality
+ SCSS compilation and bundling
+ MongoDB user auth / sessions
+ Decorators for accessing actions and state

**This framework is no longer public. There's no source code. Sorry :(**


## Goals

This project is trying to emulate Flux/Redux's unidirectional flow in a different way.

In the case of redux, you have actions, a dispatcher and reducers.

Here we just have actions, which are just namespaced functions _(namespace = action filename)_ that affect the state.

All the re-rendering is efficiently taken care by [MobX](https://github.com/mobxjs/mobx) so you can only focus on two things:

`What to name your action?` and `what should it do?`
