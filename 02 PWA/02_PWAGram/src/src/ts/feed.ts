const shareImageButton = document.querySelector("#share-image-button") as HTMLButtonElement;
const createPostArea = document.querySelector("#create-post") as HTMLTextAreaElement;
const closeCreatePostModalButton = document.querySelector("#close-create-post-modal-btn") as HTMLButtonElement;
const sharedMomentsArea = document.querySelector("#shared-moments") as HTMLDivElement;

function openCreatePostModal(): void {
  createPostArea.style.display = "block";
  if (deferredPrompt) {
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then(function (choiceResult: { outcome: string }) {
      console.log("choiceResult.outcome:", choiceResult.outcome);

      if (choiceResult.outcome === "dismissed") {
        console.log("User cancelled installation");
      } else {
        console.log("User added to home screen");
      }
    });

    deferredPrompt = null;
  }
}

function closeCreatePostModal(): void {
  createPostArea.style.display = "none";
}

shareImageButton.addEventListener("click", openCreatePostModal);

closeCreatePostModalButton.addEventListener("click", closeCreatePostModal);

// Currently not in use, allows to save assets in cache on demand otherwise
// function onSaveButtonClicked(_event: Event):void {
//   console.log("clicked");
//   if ("caches" in window) {
//     caches.open("user-requested").then(function (cache: Cache) {
//       cache.add("https://httpbin.org/get");
//       cache.add("/src/images/sf-boat.jpg");
//       console.log("cache:", cache);
//     });
//   }
// }

function createCard(): void {
  const { componentHandler } = window;
  // console.log(componentHandler);

  const cardWrapper = document.createElement("div");
  cardWrapper.className = "shared-moment-card mdl-card mdl-shadow--2dp";
  const cardTitle = document.createElement("div");
  cardTitle.className = "mdl-card__title";
  cardTitle.style.backgroundImage = 'url("/src/images/sf-boat.jpg")';
  cardTitle.style.backgroundSize = "cover";
  cardTitle.style.height = "180px";
  cardWrapper.appendChild(cardTitle);
  const cardTitleTextElement = document.createElement("h2");
  cardTitleTextElement.style.color = "black";
  cardTitleTextElement.className = "mdl-card__title-text";
  cardTitleTextElement.textContent = "San Francisco Trip";
  cardTitle.appendChild(cardTitleTextElement);
  const cardSupportingText = document.createElement("div");
  cardSupportingText.className = "mdl-card__supporting-text";
  cardSupportingText.textContent = "In San Francisco";
  cardSupportingText.style.textAlign = "center";
  // const cardSaveButton = document.createElement("button");
  // cardSaveButton.textContent = "Save";
  // cardSaveButton.addEventListener("click", onSaveButtonClicked);
  // cardSupportingText.appendChild(cardSaveButton);
  cardWrapper.appendChild(cardSupportingText);
  componentHandler.upgradeElement(cardWrapper);
  sharedMomentsArea?.appendChild(cardWrapper);
}

fetch("https://httpbin.org/get")
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    console.log("data:", data);
    createCard();
  });
