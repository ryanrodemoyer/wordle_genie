let ip = null;

export const getIpInfo = async () => {
  if (ip) {
    return ip;
  }

  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const obj = await res.json();
    ip = obj;
    return ip;
  } catch (e) {
    console.log(e);
  }
};
