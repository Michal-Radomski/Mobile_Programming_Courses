interface ObjectI {
  [key: string]: string | number;
}

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

  //* Unregister serviceWorker
  // if ("serviceWorker" in navigator) {
  //   navigator.serviceWorker.getRegistrations().then(function (registrations) {
  //     for (let i = 0; i < registrations.length; i++) {
  //       registrations[i].unregister();
  //     }
  //   });
  // }
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

function createCard(data: ObjectI): void {
  // @ ts-ignore -> for gulp-TS only
  const { componentHandler } = window as any;
  // console.log(componentHandler);

  const cardWrapper = document.createElement("div");
  cardWrapper.className = "shared-moment-card mdl-card mdl-shadow--2dp";
  const cardTitle = document.createElement("div");
  cardTitle.className = "mdl-card__title";
  // cardTitle.style.backgroundImage = 'url("/src/images/sf-boat.jpg")';
  cardTitle.style.backgroundImage = `url(${data.image})`;
  cardTitle.style.backgroundSize = "cover";
  cardTitle.style.height = "180px";
  cardWrapper.appendChild(cardTitle);
  const cardTitleTextElement = document.createElement("h2");
  cardTitleTextElement.style.color = "black";
  cardTitleTextElement.className = "mdl-card__title-text";
  // cardTitleTextElement.textContent = "San Francisco Trip";
  cardTitleTextElement.textContent = data.title as string;
  cardTitle.appendChild(cardTitleTextElement);
  const cardSupportingText = document.createElement("div");
  cardSupportingText.className = "mdl-card__supporting-text";
  // cardSupportingText.textContent = "In San Francisco";
  cardSupportingText.textContent = data.name as string;
  cardSupportingText.style.textAlign = "center";
  // const cardSaveButton = document.createElement("button");
  // cardSaveButton.textContent = "Save";
  // cardSaveButton.addEventListener("click", onSaveButtonClicked);
  // cardSupportingText.appendChild(cardSaveButton);
  cardWrapper.appendChild(cardSupportingText);

  componentHandler.upgradeElement(cardWrapper);
  sharedMomentsArea?.appendChild(cardWrapper);
}

function clearCards(): void {
  while (sharedMomentsArea.hasChildNodes()) {
    sharedMomentsArea.removeChild(sharedMomentsArea.lastChild!);
  }
}

function updateUI(data: any[]) {
  clearCards();
  for (let i = 0; i < data.length; i++) {
    createCard(data[i]);
  }
}

// const url: string = "https://httpbin.org/get";
const url = "https://pwagram-cf0e1-default-rtdb.europe-west1.firebasedatabase.app/posts.json"; // Temp
let networkDataReceived: boolean = false;

fetch(url)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    // console.log("data:", data);
    networkDataReceived = true;
    console.log("From web", data);
    clearCards();
    const dataArray = [];
    for (let key in data) {
      dataArray.push(data[key]);
    }
    updateUI(dataArray);
  });

if ("caches" in window) {
  // console.log("caches:", caches);
  caches
    .match(url)
    .then(function (response) {
      if (response) {
        return response.json();
      }
    })
    .then(function (data) {
      console.log("From cache", data);
      if (!networkDataReceived) {
        clearCards();
        const dataArray = [];
        for (let key in data) {
          dataArray.push(data[key]);
        }
        updateUI(dataArray);
      }
    });
}
