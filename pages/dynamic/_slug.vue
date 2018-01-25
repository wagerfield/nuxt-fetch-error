<template>
  <div>
    <h1>Dynamic Page</h1>
    <ul>
      <li><nuxt-link to="/">/index</nuxt-link></li>
      <li><nuxt-link to="/one">/one</nuxt-link></li>
      <li><nuxt-link to="/two">/two</nuxt-link></li>
    </ul>
    <pre>route.params: {{$route.params}}</pre>
  </div>
</template>

<script>
export default {
  validate({ params }) {
    console.log('dynamic.validate:', params)
    return params.slug === 'valid'
  },
  fetch({ params }) {
    console.log('dynamic.fetch:', params)
    return Promise.resolve(params)
  }
}
</script>
