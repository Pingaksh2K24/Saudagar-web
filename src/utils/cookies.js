// Cookie utility functions
export const setCookie = (name, value, days = 7) => {
  const expires = new Date()
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000))
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`
}

export const getCookie = (name) => {
  const nameEQ = name + "="
  const ca = document.cookie.split(';')
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

export const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}

// User session management
export const setUserSession = (token, userDetails) => {
  setCookie('auth_token', token, 7)
  setCookie('user_details', JSON.stringify(userDetails), 7)
}

export const getUserSession = () => {
  const token = getCookie('auth_token')
  const userDetails = getCookie('user_details')
  console.log('User Details from Cookie:', userDetails);
  console.log('Token from Cookie:', token);
  if (token && userDetails) {
    try {
      return {
        token,
        user: JSON.parse(userDetails)
      }
    } catch (error) {
      console.error('Error parsing user details:', error)
      return null
    }
  }
  return null
}

export const clearUserSession = () => {
  deleteCookie('auth_token')
  deleteCookie('user_details')
}

export const isUserLoggedIn = () => {
  return getCookie('auth_token') !== null
}