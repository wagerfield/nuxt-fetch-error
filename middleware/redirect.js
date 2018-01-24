export default ({ route, redirect }) => {
  if (route.path === '/dynamic') {
    console.log('redirect from [/dynamic] to [/dynamic/valid]')
    redirect('/dynamic/valid')
  }
}
