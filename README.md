# Travel Audience - Front End Challenge

### Hi!

This is the application that I built based on the instructions that the company provided.

## Test

![coverage](public/test.png)

## Screenshot

![screenshot](public/screenshot.png)

### Instructions on how to run

- yarn install
- yarn start
- yarn test

### Implemented functionality

- Fetch all star wars characters.
- Pick favorite characters.
- Filter characters based on films, eye color, gender and hair color.
- Download csv on favorite characters
- Theme & branding based on Star Wars colors

### Not implemented due to time constraint

- Pagination and windowing of large data set upon initial load.
- Dedicated 1 character view
- Cypress end to end testing
- Performance issues and assessment.
- Local storage to persist favorites

### Folder structure

- src/components - generic components
- src/features - components connected with redux and reducer
- src/app/api - backend api
- src/mocks - mock data for testing

### Technology stack used

- TypeScript
- @redux/toolkit for opinionated redux setup
- RTK Query
- Jest and React Testing Library for Unit and Integration Test
- MSW & Faker for integration testing data needs

# Note

I am using redux toolkit it uses [immerjs](https://immerjs.github.io/immer/docs/introduction) behind the scene that enables developer to write mutation operations that are translated to immutable operation

```ts
// This is immutable operation behind the scene courtesy of immerjs
toggleIsLoading: (state) => {
      state.isLoading = !state.isLoading;
    },
```

I would love to have your feedback regarding the application. If you have question or would want me to explain parts of it please let me know. If for some reason the app doesn't run please let me know. (sbalbalosa@gmail.com)

Thanks,
Sharlon Balbalosa
