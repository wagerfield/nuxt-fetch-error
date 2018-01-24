You know the drill...

```bash
yarn install && yarn start
```

This repo demos the erroneous behaviour of the `validate`, `fetch` and `asyncData` page component methods when using the context `redirect` method in some middleware.

![Nuxt Schema](https://nuxtjs.org/nuxt-schema.png)

Looking at the schema, all middleware is called _before_ the `validate`, `fetch` and `asyncData` methods on a page component.

After running `yarn start` and navigating to `http://localhost:3000` you will see a "Dynamic" link that will navigate you to `/dynamic`.

If you open your console and then click the link you should see 3 logs:

1. `redirect from [/dynamic] to [/dynamic/valid]`
2. `dynamic.validate: {}`
3. A rather crypic error: `{__ob__: Observer}`

Start by looking at `nuxt.config.js`. You will see that a `redirect` middleware has been defined on the `router`.

If you then take a look at `middleware/redirect.js`, you will see some simple logic that redirects to `/dynamic/valid` when the route path is `/dynamic`. This logic will take affect when you clicked the "Dynamic" link on the index page.

The erroneous behaviour to be observed is that the second log (`dynamic.validate: {}`) should actually print the object that you see rendered on the page: `{ "slug": "valid" }`

However, since the `params` object that is being passed in the context to the `validate` method is empty, the `validate` method returns false since the condition fails:

### `pages/dynamic.vue`

```js
export default {
  validate({ params }) {
    console.log('dynamic.validate:', JSON.stringify(params))
    return params.slug === 'valid' // This fails because params is an empty object when called
  },
  ...
}
```

Since `params` is an empty object, the validation fails and the cryptic error (`{__ob__: Observer}`) is printed to the console.

If you comment out the `validate` method, navigate back to the index page and then click on the "Dynamic" link again, you will notice another strange behaviour: `dynamic.fetch: {"slug":"valid"}` is printed to the console _twice_?
