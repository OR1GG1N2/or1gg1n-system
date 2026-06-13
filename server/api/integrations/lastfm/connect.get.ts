export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  const apiKey = process.env.NUXT_OAUTH_LASTFM_CLIENT_ID 
  const apiSecret = process.env.NUXT_OAUTH_LASTFM_CLIENT_SECRET 
  
  // getRequestURL автоматически подставит localhost локально и твой домен на проде
  const origin = getRequestURL(event).origin
  const callbackUrl = `${origin}/api/integrations/lastfm/callback`

  const lastfmAuthUrl = `http://www.last.fm/api/auth/?api_key=${apiKey}&cb=${encodeURIComponent(callbackUrl)}`

  return sendRedirect(event, lastfmAuthUrl)
})