Issue Ref: https://github.com/nuxt/nuxt.js/issues/2665

This repo demos the erroneous behaviour of page component `validate` and `fetch` methods when used in conjunction with Nuxt's `context.redirect` method in some middleware.

![Nuxt Schema](https://nuxtjs.org/nuxt-schema.png)

Looking at the schema, middleware is run _before_ page component `validate` and `fetch` methods.

However, when calling `redirect` in middleware, the `validate` and `fetch` methods are still called on page components that are being redirected away from. It is my opinion that the `validate/fetch/asyncData` methods should not be called on pages that are being redirected from

### Demo

You know the drill...

```bash
yarn install && yarn start
```

1. Navigate to `http://localhost:3000` and open your console
2. Click the `/one` link and observe the 2 logs in the console (this is what I would expect to happen)

```
one.validate
one.fetch
```

3. Click the `/index` link to return to the Index Page
4. Click the `/two` link and observe the next 5 logs in the console:

```
redirecting from [/two] to [/one]
two.validate
two.fetch
one.validate
one.fetch
```

The `redirect` middleware that is set on the `router` object in `nuxt.config.js` matches the route path `/two` and redirects you to `/one`. However, the `validate` and `fetch` methods for `pages/two.vue` are still called?

5. Return to the Index Page, refresh your browser and open your console
6. Click the `/two` link and observe the 3 logs in the console:

```
redirecting from [/two] to [/one]
one.validate
one.fetch
```

With a page refresh, clicking the `/two` link this time around does not call `validate` and `fetch` methods for `pages/two.vue`. This is what I would expect to happen.

7. While still on the `/one` page, click on the `/index` link
8. Now click on `/two` link a second time and observe the same 5 logs as before:

```
redirecting from [/two] to [/one]
two.validate
two.fetch
one.validate
one.fetch
```

Once again you should see that the `validate` and `fetch` methods are called for `pages/two.vue`—this is inconsistent behaviour.

**Now let's look at dynamic routes...**

9. Return to the Index Page, refresh the browser and open the console
10. Click on the `/dynamic` link and observe the following 3 logs:

```
redirecting from [/dynamic] to [/dynamic/valid]
dynamic.validate: {slug: undefined}
{__ob__: Observer}
```

The `redirect` middleware matches the `/dynamic` route path and redirects to `/dynamic/valid`. However before doing so, the `validate` method of `pages/dynamic/_slug.vue` component is called with the `params` for the route _before the redirect_.

Since there are no route params, `slug` is `undefined`...and since `slug` is `undefined`, the `validate` method fails:

```js
// pages/dynamic/_slug.vue
export default {
  validate({ params }) {
    console.log('dynamic.validate:', params)
    return params.slug === 'valid' // slug is undefined, so this returns false
  }
}
```

Since the `validate` method returns `false`, we get the rather cryptic error:

```
{__ob__: Observer}
```

The interesting thing about the dynamic page example is that because the same page component is matched for both `/dynamic` and `/dynamic/valid`, the `validate` and `fetch` methods are not called a second time _after the redirect_ has happened. Therefore the `validate` method that relies on the route `params.slug` being set to "valid" never passes.
