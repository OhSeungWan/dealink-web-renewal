export const userApi = {
  fetchByCode: code =>
    fetch(`http://192.168.0.120:8080/user/authentication/code?code=${code}`)
};
