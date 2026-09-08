import Cookies from "js-cookie";


const COOKIE_CONFIG={
    secure:import.meta.env.PROD,
    path:"/",
    sameSite:'strict' as const,
    expires:7
}

export const setAuthCookie=(
    token:string
)=>{
try {
    Cookies.set('token',token,{
        ...COOKIE_CONFIG,
        expires:1
    })
} catch (error) {
    console.error('Error setting auth cookies:', error);
}


}

export const getAuthCookie=()=>{
    try {
    return {
      token: Cookies.get('token') || null,
    };
  } catch (error) {
    console.error('Error getting auth cookies:', error);
    return {
      token: null,
    };
  }
}

export const getCookie = (name: string): string | null => {
  try {
    return Cookies.get(name) || null;
  } catch (error) {
    console.error(`Error getting cookie ${name}:`, error);
    return null;
  }
};

export const setCookie = (
  name: string,
  value: string,
  expires: number = 7
) => {
  try {
    Cookies.set(name, value, {
      ...COOKIE_CONFIG,
      expires,
    });
  } catch (error) {
    console.error(`Error setting cookie ${name}:`, error);
  }
};

export const removeAuthCookies = () => {
  try {
    Cookies.remove('token', { path: '/' });
  } catch (error) {
    console.error('Error removing auth cookies:', error);
  }
};

export const removeCookie = (name: string) => {
  try {
    Cookies.remove(name, { path: '/' });
  } catch (error) {
    console.error(`Error removing cookie ${name}:`, error);
  }
};

export const isAuthenticated = (): boolean => {
  const { token } = getAuthCookie();
  return !!token;
};

export const getAllCookies = (): Record<string, string> => {
  try {
    return Cookies.get();
  } catch (error) {
    console.error('Error getting all cookies:', error);
    return {};
  }
};

export const clearAllCookies = () => {
  try {
    const cookies = Cookies.get();
    Object.keys(cookies).forEach(cookieName => {
      Cookies.remove(cookieName, { path: '/' });
    });
  } catch (error) {
    console.error('Error clearing all cookies:', error);
  }
};
