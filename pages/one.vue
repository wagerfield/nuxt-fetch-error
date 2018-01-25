<template>
  <div>
    <h1>One Page</h1>
    <ul>
      <li><nuxt-link to="/">/index</nuxt-link></li>
      <li><nuxt-link to="/two">/two</nuxt-link></li>
      <li><nuxt-link to="/dynamic">/dynamic</nuxt-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  validate() {
    console.log('one.validate')
    return true
  },
  fetch() {
    console.log('one.fetch')
    return Promise.resolve()
  }
}
</script>
