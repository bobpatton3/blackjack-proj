This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Local Execution

Clone the repo down to your machine and then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Notes on the Implementation

There are several things worth pointing out that I did that were - in many ways - unnecessary but I included them in order to demonstrate certain programming elements:

- Everything in the PlayersPanel could easily have been in the DealersPanel but I wanted to demonstrate data sharing via prop drilling and especially child-to-parent flow via callbacks. For that matter I could have put everything in page.tsx and had my only React element as CardPanel (needed for reuse). But the current division is better aesthetically and will be more readily extensible if we were to add any significant new features in the future.
- I originally thought I would be using the Context API via deckDataContext.tsx but it ended up being fully unnecessary as I never read back from it in any components. I left it in just as demonstration of the API which can be very useful in larger projects if you don't need all the features of Redux.
- Rather than make API calls everytime I need a new card I retrieve the whole deck and work my way through it locally so that the interface can be more performant. Even if we were to move to a 6 deck draw as I believe the casinos use that would still not constitute nearly enough data to begin causing problems for the browser.

## Requirements
