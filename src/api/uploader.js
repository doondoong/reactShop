import { envVars } from "../vars";

export async function uploadImage(file) {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", envVars.REACT_APP_CLOUDINARY_PRESET);
  return fetch(envVars.REACT_APP_CLOUDINARY_URL, {
    method: "POST",
    body: data,
  })
    .then((res) => res.json())
    .then((data) => data.url);
}
