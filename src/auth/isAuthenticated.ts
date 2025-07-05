export function IsAuthenticated() {
  return sessionStorage.getItem("token") ? true : false;
}
