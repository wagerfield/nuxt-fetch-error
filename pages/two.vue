<template>
  <div>
    <h1>Two Page</h1>
    <ul>
      <li><nuxt-link to="/">/index</nuxt-link></li>
      <li><nuxt-link to="/one">/one</nuxt-link></li>
      <li><nuxt-link to="/dynamic">/dynamic</nuxt-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  validate() {
    console.log('two.validate')
    return true
  },
  fetch() {
    console.log('two.fetch')
    return Promise.resolve()
  }
}
</script>
