const REDIRECT_MAP = {
  '/two': '/one',
  '/dynamic': '/dynamic/valid'
}

export default ({ route, redirect }) => {
  const redirectPath = REDIRECT_MAP[route.path]
  if (redirectPath) {
    console.log('redirecting from [%s] to [%s]', route.path, redirectPath)
    redirect(redirectPath)
  }
}
