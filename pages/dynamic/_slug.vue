<template>
  <div>
    <h1>Dummy {{$route.params}}</h1>
    <nuxt-link to="/">Index</nuxt-link>
  </div>
</template>

<script>
export default {
  // validate({ params }) {
  //   console.log('dynamic.validate:', JSON.stringify(params))
  //   return params.slug === 'valid'
  // },
  fetch({ params }) {
    console.log('dynamic.fetch:', JSON.stringify(params))
    return Promise.resolve(params)
  }
}
</script>
