import { getAccessToken } from "./get-token.js";
const rootURL = "https://photo-app-secured.herokuapp.com";

export async function createPost() {
  // get access token (like logging in) so that you can query for "your data":
  const token = await getAccessToken(rootURL, "kate", "password");

  // data to sent to server:
  const postData = {
    image_url:
      "https://i.pinimg.com/474x/64/8d/7a/648d7ada46d84aaad5f0ba34d0505a9c.jpg",
    caption: "i'm beary excited for spring break!",
    alt_text: "art of a low poly bear",
  };

  // endpoint:
  const endpoint = `${rootURL}/api/posts/`;

  // send asynchronous request and wait for response headers:
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(postData),
  });

  // now wait for response body (also asynchronous):
  const data = await response.json();

  // now print to the console:
  console.log(data);
}

createPost();
