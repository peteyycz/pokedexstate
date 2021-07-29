FSM talk

FRONTEND DEVELOPERS! Hey, I’m sure you’ve heard a million times already which one is the best UI framework! For years it has been a debate and there has been many emerging technologies that supposedly changed the way you work, right? For a while there’s been a war between the different UI technologies, nowadays it looks like that war has settled and went into a Cold War state between angular, react and vue, and x and y.

Nowadays the war has shifted to another plane of existence. STATE MANAGEMENT. State management is basically a way to describe where the data lives. I’ve had to deal with react in the past few years so let me update you on the evolution of state management libraries in that scene at least what I’ve been through.
- this.setState -> Flux -> Reflux -> Redux -> MobX -> Redux Thunks -> Redux Saga -> hooks -> context -> Recoil -> Zustand -> Please no more bc my head’s gonna blow up
Hell we’ve been writing our own @RisingStack, check out react-easy-state btw it’s easy and react (no-one ever mentioned the two words together)

There must be a better way. We have to turn to science for an answer.

Ok ok. Think of the most scientific thing in computer science. What is that?
I’ve got a few guesses:
- Bayesian Uncertainty measures for neural networks if you’re into machine learning
- Category theory and MONADS ( if you’re a functional nerd )
- Raytracing or binary space partitioning in game programming

I’m a simple man, and I work on visible and invisible things on the internet. For me one of the most interesting topics in computer science was Finite State Machines since I’ve learnt about them in university some time ago. It never really clicked until recently when I saw the author of XState present his ideas at a conference. Don’t worry our time is also finite, so I’d like to keep it as short as possible.

Let me explain how FSM can help you write better programs today:

- What is a FSM?
- Traffic light example

- FSM applied
    - Data fetching example:
        - What does most of the apps do? UI -> Click -> API -> Data transform -> UI -> Click -> API -> Data transform
            - What are we doing wrong?????
                - Not clearly defining application states, MOST PROGRAMMERS ONLY cover the happy path. As a developer you always have to remember that the happy path is not the only path.
            - How does XState help?
    - Problems of state management in React


Things like WIZARDS, multi-step pickers, data fetching made easy.

    - Problems modelling applications

I’m not saying that right now you should go back to your boss tomorrow and say we’re halting development for the next quarter bc of an application rewrite (please don’t I beg you) All I’m saying that with this tool under your belt you should be aware that there are certain problems that are easier to manage with tools like XState. FSM in general is a way to develop applications but you can learn from it, and apply certain parts of it into your current thinking process when you try to create states and transitions in your application.
