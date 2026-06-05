// composables/useApi.ts
export const useApi = () => {
  const getAuthHeaders = () => {
    const headers: Record<string, string> = {};
    
    // Проверяем наличие API токена в localStorage (только на клиенте)
    if (process.client) {
      const apiToken = localStorage.getItem('api_token');
      if (apiToken) {
        headers['Authorization'] = `Bearer ${apiToken}`;
      }
    }
    
    return headers;
  };
  
  const fetchWithAuth = async (url: string, options: any = {}) => {
    return $fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        ...getAuthHeaders(),
      },
    });
  };
  
  const saveApiToken = (token: string) => {
    if (process.client) {
      localStorage.setItem('api_token', token);
    }
  };
  
  const clearApiToken = () => {
    if (process.client) {
      localStorage.removeItem('api_token');
    }
  };
  
  const getApiToken = () => {
    if (process.client) {
      return localStorage.getItem('api_token');
    }
    return null;
  };
  
  return {
    fetchWithAuth,
    saveApiToken,
    clearApiToken,
    getApiToken,
  };
};