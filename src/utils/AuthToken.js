function setAuthToken(key, token, expiry) {
  const now = new Date()

  const dataStorage = {
    token,
    expiry: now.getTime() + expiry,
  }

  localStorage.setItem(key, JSON.stringify(dataStorage))
}

function validateAuthToken(key) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  const item = JSON.parse(itemStr);
  const now = new Date();

  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }

  return item.token;
}

export default {
  setAuthToken,
  validateAuthToken,
}