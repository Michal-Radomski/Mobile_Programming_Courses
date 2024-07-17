interface ObjectI {
  [key: string]: string | number;
}

interface LatLng {
  lat: null | number;
  lng: null | number;
}

const shareImageButton = document.querySelector("#share-image-button") as HTMLButtonElement;
const createPostArea = document.querySelector("#create-post") as HTMLTextAreaElement;
const closeCreatePostModalButton = document.querySelector("#close-create-post-modal-btn") as HTMLButtonElement;
const sharedMomentsArea = document.querySelector("#shared-moments") as HTMLDivElement;
const form = document.querySelector("form") as HTMLFormElement;
const titleInput = document.querySelector("#title") as HTMLInputElement;
const locationInput = document.querySelector("#location") as HTMLInputElement;
const videoPlayer = document.querySelector("#player") as HTMLVideoElement;
const canvasElement = document.querySelector("#canvas") as HTMLCanvasElement;
const captureButton = document.querySelector("#capture-btn") as HTMLButtonElement;
const imagePicker = document.querySelector("#image-picker") as HTMLInputElement;
const imagePickerArea = document.querySelector("#pick-image") as HTMLDivElement;
const locationBtn = document.querySelector("#location-btn") as HTMLButtonElement;
const locationLoader = document.querySelector("#location-loader") as HTMLDivElement;

let picture: Blob;
let fetchedLocation: LatLng;

locationBtn.addEventListener("click", function (_event) {
  if (!("geolocation" in navigator)) {
    return;
  }

  // if ("geolocation" in navigator) {
  //   console.log("navigator?.geolocation:", navigator?.geolocation);
  // }

  locationBtn.style.display = "none";
  locationLoader.style.display = "block";

  navigator.geolocation.getCurrentPosition(
    function (position: GeolocationPosition) {
      // console.log("position:", position);
      locationBtn.style.display = "inline";
      locationLoader.style.display = "none";
      fetchedLocation = { lat: position.coords.latitude, lng: 0 };
      locationInput.value = "In Gdansk";
      (document.querySelector("#manual-location") as HTMLDivElement).classList.add("is-focused");
    },
    function (err) {
      console.log("err:", err);
      locationBtn.style.display = "inline";
      locationLoader.style.display = "none";
      alert("Couldn't fetch location, please enter manually!");
      fetchedLocation = { lat: null, lng: null };
    },
    { timeout: 7000 }
  );
});

function initializeLocation(): void {
  if (!("geolocation" in navigator)) {
    locationBtn.style.display = "none";
  }
}

function initializeMedia(): void {
  // if ("mediaDevices" in navigator) {
  //   console.log("navigator:", navigator);
  //   console.log("mediaDevices:", navigator.mediaDevices as MediaDevices);
  // }

  if (!("mediaDevices" in navigator)) {
    (navigator as any).mediaDevices = {};
  }

  if (!("getUserMedia" in navigator.mediaDevices)) {
    (navigator as any).mediaDevices.getUserMedia = function (constraints: any) {
      const getUserMedia = (navigator as any).webkitGetUserMedia || (navigator as any).mozGetUserMedia;

      if (!getUserMedia) {
        return Promise.reject(new Error("getUserMedia is not implemented!"));
      }

      return new Promise(function (resolve, reject) {
        getUserMedia.call(navigator, constraints, resolve, reject);
      });
    };
  }

  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(function (stream: MediaStream) {
      videoPlayer.srcObject = stream;
      videoPlayer.style.display = "block";
    })
    .catch(function (error) {
      console.log("error:", error);
      imagePickerArea.style.display = "block";
    });
}

captureButton.addEventListener("click", function (_event: MouseEvent) {
  // console.log("_event:", _event);
  canvasElement.style.display = "block";
  videoPlayer.style.display = "none";
  captureButton.style.display = "none";
  const context = canvasElement.getContext("2d");
  context?.drawImage(
    videoPlayer,
    0,
    0,
    canvasElement.width,
    videoPlayer.videoHeight / (videoPlayer.videoWidth / canvasElement.width)
  );
  // @ts-ignore
  videoPlayer?.srcObject?.getVideoTracks().forEach(function (track: MediaStreamTrack) {
    // console.log("track:", track);
    track.stop();
  });
  const dataURL: string = canvasElement.toDataURL();
  // console.log({ dataURL });

  picture = dataURItoBlob(dataURL) as Blob;
  // console.log("picture:", picture);
});

imagePicker.addEventListener("change", function (event: Event) {
  picture = (event?.target as HTMLInputElement)?.files?.[0] as Blob;
});

function openCreatePostModal(): void {
  // createPostArea.style.display = "block";
  createPostArea.style.transform = "translateY(0)";
  initializeMedia();
  initializeLocation();

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
  createPostArea.style.transform = "translateY(100vh)";
  imagePickerArea.style.display = "none";
  videoPlayer.style.display = "none";
  canvasElement.style.display = "none";
  locationBtn.style.display = "inline";
  locationLoader.style.display = "none";
  // createPostArea.style.display = 'none';
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
  cardTitle.style.backgroundPosition = "center"; // Or try 'center'
  // cardTitle.style.height = "180px";
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
const url = FB_URL;
// console.log({ FB_URL });

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

// if ("caches" in window) {
//   // console.log("caches:", caches);
//   caches
//     .match(url)
//     .then(function (response) {
//       if (response) {
//         return response.json();
//       }
//     })
//     .then(function (data) {
//       console.log("From cache", data);
//       if (!networkDataReceived) {
//         clearCards();
//         const dataArray = [];
//         for (let key in data) {
//           dataArray.push(data[key]);
//         }
//         updateUI(dataArray);
//       }
//     });
// }

if ("indexedDB" in window) {
  readAllData("posts").then(function (data: any[]) {
    if (!networkDataReceived) {
      console.log("From cache", data);
      updateUI(data);
    }
  });
}

function sendData(): void {
  const id = new Date().toISOString();
  const postData = new FormData();
  postData.append("id", id);
  postData.append("title", titleInput.value);
  postData.append("location", locationInput.value);
  postData.append("rawLocationLat", (fetchedLocation.lat as number).toString());
  postData.append("rawLocationLng", (fetchedLocation.lng as number).toString());
  postData.append("file", picture, id + ".png");

  fetch(FB_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    // body: JSON.stringify({
    //   id: new Date().toISOString(),
    //   title: titleInput.value,
    //   location: locationInput.value,
    //   image: "image URL", // Temp url
    // }),
    body: postData,
  }).then(function (res) {
    console.log("Sent data", res);
    // updateUI(res); // Temp ???
  });
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (titleInput.value.trim() === "" || locationInput.value.trim() === "") {
    alert("Please enter valid data!");
    return;
  }

  closeCreatePostModal();

  if ("serviceWorker" in navigator && "SyncManager" in window) {
    navigator.serviceWorker.ready.then(function (sw: ServiceWorkerRegistration) {
      const post = {
        id: new Date().toISOString(),
        title: titleInput.value,
        location: locationInput.value,
        picture: picture,
        rawLocation: fetchedLocation,
      };
      writeData("sync-posts", post)
        .then(function () {
          // @ts-ignore
          return sw.sync.register("sync-new-post");
        })
        .then(function () {
          const snackbackContainer = document.querySelector("#confirmation-toast") as HTMLDivElement;
          const data = { message: "Your Post was saved for syncing!" };
          // @ts-ignore (material-design-lite)
          snackbackContainer?.MaterialSnackback?.showSnackbar(data);
        })
        .catch(function (err: Error) {
          console.log({ err });
        });
    });
  } else {
    sendData();
  }
});
