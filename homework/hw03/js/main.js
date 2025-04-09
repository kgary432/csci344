import { getAccessToken } from "./utilities.js";
const rootURL = "https://photo-app-secured.herokuapp.com";
let token = null;
let username = "kate";
let password = "password";

async function initializeScreen() {
  // this function is getting invoked when the page first loads:
  token = await getAccessToken(rootURL, username, password);
  showNav();
  // get posts:
  getPosts();
  getProfile();
  getSuggestions();
  getStories();
}

function showNav() {
  document.querySelector("#nav").innerHTML = `
    <nav class="flex justify-between py-5 px-9 bg-white border-b fixed w-full top-0">
            <h1 class="font-Comfortaa font-bold text-2xl">Photo App</h1>
            <ul class="flex gap-4 text-sm items-center justify-center">
                <li><span>${username}</span></li>
                <li><button class="text-blue-700 py-2">Sign out</button></li>
            </ul>
        </nav>
    `;
}
// implement remaining functionality below:

//await / async syntax:
async function getStories() {
  const response = await fetch(
    "https://photo-app-secured.herokuapp.com/api/stories/",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  console.log(data);
  renderStories(data);
}

function renderStory(storyJSON) {
  const template = `
        <div class="flex flex-col justify-center items-center">
          <img src="${storyJSON.user.thumb_url}" alt="${storyJSON.user.username}'s profile picture" class="rounded-full border-4 border-gray-300" />
          <p class="text-xs text-gray-500">${storyJSON.user.username}</p>
        </div>
    `;
  const container = document.querySelector("main header");
  container.insertAdjacentHTML("beforeend", template);
}

function renderStories(storiesJSON) {
  storiesJSON.forEach(renderStory);
}

//await / async syntax:
async function getProfile() {
  const response = await fetch(
    "https://photo-app-secured.herokuapp.com/api/profile/",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  console.log(data);
  renderProfile(data);
}

function renderProfile(profileJSON) {
  const template = `    
  <header class="flex gap-4 items-center">
      <img src="${profileJSON.thumb_url}" alt="${profileJSON.username}'s profile picture" class="rounded-full w-16" />
      <h2 class="font-Comfortaa font-bold text-2xl">${profileJSON.username}</h2>
    </header>
  `;
  const container = document.querySelector("aside");
  container.insertAdjacentHTML("afterbegin", template);
}

//await / async syntax:
async function getSuggestions() {
  const response = await fetch(
    "https://photo-app-secured.herokuapp.com/api/suggestions/",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  console.log(data);
  renderSuggestions(data);
}

function renderSuggestion(suggestionJSON) {
  const template = ` <section class="flex justify-between items-center mb-4 gap-2">
        <img src="${suggestionJSON.thumb_url}" alt="${suggestionJSON.username}'s profile picture}" class="rounded-full w-16" />
        <div class="w-[180px]">
          <p class="font-bold text-sm">${suggestionJSON.username}</p>
          <p class="text-gray-800 text-xs">suggested for you</p>
        </div>
        <button class="text-blue-800 text-sm py-2">follow</button>
      </section>
    `;
  const container = document.querySelector("aside");
  container.insertAdjacentHTML("beforeend", template);
}

function renderSuggestions(suggestionsJSON) {
  suggestionsJSON.forEach(renderSuggestion);
}

//await / async syntax:
async function getPosts() {
  const response = await fetch(
    "https://photo-app-secured.herokuapp.com/api/posts/?limit=10",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  console.log(data);
  renderPosts(data);
}

function tempOnClick(label) {
  console.log(`${label} button clicked`);
}

function renderPost(postJSON) {
  const template = `
        <section class="bg-white border mb-10">
            <div class="p-4 flex justify-between">
                <h3 class="text-lg font-Comfortaa font-bold">${
                  postJSON.user.username
                }</h3>
                <button class="icon-button" aria-label="More options"><i class="fas fa-ellipsis-h"></i></button>
            </div>
            <img src="${postJSON.image_url}" alt="image posted by ${
    postJSON.user.username
  }" width="300" height="300"
                class="w-full bg-cover">
            <div class="p-4">
                <div class="flex justify-between text-2xl mb-3">
                    <div>
                        ${renderLikeButton(postJSON)}
                        <button aria-label="Comment"><i class="far fa-comment"></i></button>
                        <button aria-label="Share"><i class="far fa-paper-plane"></i></button>
                    </div>
                    <div>
                        ${renderBookmarkButton(postJSON)}
                    </div>
                </div>
                <p class="font-bold mb-3">${postJSON.likes.length} likes</p>
                <div class="text-sm mb-3">
                    <p>
                        <strong>${postJSON.user.username}</strong>
                        ${
                          postJSON.caption
                        } <button class="button" aria-label="Read more">more</button>
                    </p>
                </div>
                ${showComments(postJSON.comments)}
                <p class="uppercase text-gray-600 text-xs">1 day ago</p>
            </div>
            <div class="flex justify-between items-center p-3">
                <div class="flex items-center gap-3 min-w-[80%]">
                    <i class="far fa-smile text-lg"></i>
                    <input aria-label="add a comment" type="text" class="min-w-[80%] focus:outline-none" placeholder="Add a comment...">
                </div>
                <button class="text-blue-600 py-2" aria-label="Post comment">Post</button>
            </div>
        </section>
    `;
  const container = document.querySelector("main");
  container.insertAdjacentHTML("beforeend", template);
}

function renderPosts(postListJSON) {
  // option 1:
  postListJSON.forEach(renderPost);
}

function showComments(comments) {
  const lastComment = comments[comments.length - 1];

  if (comments.length > 1) {
    return `
    <button class="text-sm mb-3"> view all ${comments.length} comments</button>
    <p class="text-sm mb-3">
      <strong>
        ${lastComment.user.username} </strong>${lastComment.text}
    </p>
    `;
  }
  if (comments.length === 1) {
    return `
       <p class="text-sm mb-3">
      <strong>
        ${lastComment.user.username} </strong>${lastComment.text}
    </p>
    `;
  }

  return ``;
}

// function renderCommentButton(post) {
//   return `
//     <button onclick="tempOnClick('comment')">
//       <i class="far fa-comment"></i>
//     </button>
//   `;
// }
// function renderShareButton(post) {}
function renderBookmarkButton(post) {
  if (post.current_user_bookmark_id) {
    return `
      <button aria-label="Un-bookmark" onclick="deleteBookmark(${post.current_user_bookmark_id})">
        <i class="fa-solid fa-bookmark"></i>
      </button>
  `;
  } else {
    return `
      <button aria-label="Bookmark" onclick="createBookmark(${post.id})">
        <i class="far fa-bookmark"></i>
      </button>
  `;
  }
}

window.createBookmark = async function (postId) {
  const postData = {
    post_id: postId,
  };
  const response = await fetch(
    "https://photo-app-secured.herokuapp.com/api/bookmarks/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    }
  );
  const data = await response.json();
  console.log(data);
};

window.deleteBookmark = async function (bookmarkId) {
  //in theory this should work but currently it returns a bunch of big red errors
  const response = await fetch(
    `https://photo-app-secured.herokuapp.com/api/bookmarks/${bookmarkId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (response.ok) {
    console.log(`Bookmark ${bookmarkId} deleted successfully`);
  } else {
    console.error(`Failed to delete bookmark ${bookmarkId}`);
  }
};

function renderLikeButton(post) {
  if (post.current_user_like_id) {
    return `
      <button aria-label="Unlike" onclick="deleteLike(${post.current_user_like_id})">
        <i class="fa-solid fa-heart text-red-500"></i>
      </button>
  `;
  } else {
    return `
      <button aria-label="Like" onclick="createLike(${post.id})">
        <i class="far fa-heart"></i>
      </button>
  `;
  }
}

//await / async syntax:
window.createLike = async function (postId) {
  const postData = {
    post_id: postId,
  };
  const response = await fetch(
    "https://photo-app-secured.herokuapp.com/api/likes/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    }
  );
  const data = await response.json();
  console.log(data);
};

window.deleteLike = async function (likeId) {
  const response = await fetch(
    `https://photo-app-secured.herokuapp.com/api/likes/${likeId}/`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (response.ok) {
    console.log(`Like ${likeId} deleted successfully`);
  } else {
    console.error(`Failed to delete like ${likeId}`);
  }
};

// after all of the functions are defined, invoke initialize at the bottom:
initializeScreen();
