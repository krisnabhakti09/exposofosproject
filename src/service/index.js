// export const baseURL = "https://sofosrobotics.my.id/app"
export const baseURL = "http://192.168.4.186:8080";

export let myHeadersApiPublic = new Headers();
myHeadersApiPublic.append("Content-Type", "application/json");

export const uploadAvatarService = (token, uri, type) => {
  let myHeadersApiPrivate = new Headers();
  myHeadersApiPrivate.append("Content-Type", "multipart/form-data");
  myHeadersApiPrivate.append("Authorization", `Bearer ${token}`);

  let formData = new FormData();
  formData.append("avatar", {
    uri: uri,
    type: "image/jpeg",
    name: uri.split("/").pop(),
  });

  console.log(uri.split("/").pop());

  const consume = fetch(`${baseURL}/api/v1/users/avatars/`, {
    method: "POST",
    body: formData,
    headers: myHeadersApiPrivate,
  })
    .then((response) => response.json())
    // .then(response => console.log(response))
    .catch((err) => console.log(err));
  return consume;
};
