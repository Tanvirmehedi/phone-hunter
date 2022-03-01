// Get Phone Api By search
const getPhoneApi = async () => {
  const inputBox = document.getElementById("search-input");
  const inputValue = inputBox.value;

  if (inputValue === "") {
    errMessage("Give A valid Phone Name!");
    inputBox.value = "";
    spinner("none");
    toggleId("display-phone-search-by-name", "block");
  } else {
    spinner("block");
    toggleId("display-phone-search-by-name", "none");
    const baseUrl = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`;
    try {
      const request = await fetch(baseUrl);
      const phoneData = await request.json();
      if (phoneData.data.length === 0) {
        spinner("none");
        toggleId("display-phone-search-by-name", "block");
        errMessage(
          `No Data Found in <span class="text-yellow-500 font-bold"> ${inputValue}</span>! Please Try Another Search`
        );
      } else {
        displaySearchResult(phoneData.data);
      }
      inputBox.value = "";
    } catch (err) {
      errMessage(err);
    }
  }
};

const displaySearchResult = (result) => {
  toggleId("home-screen-part", "none");
  const phoneGridBox = document.getElementById("phone-grid-box");
  phoneGridBox.innerText = "";
  const firstTwentyItems = result.slice(0, 20);
  for (const item of firstTwentyItems) {
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="flex justify-around items-center border-2 rounded-md mx-auto w-11/12">
            <div class="images py-3 ">
                <img src="${item.image}" alt="${item.phone_name}" class=" p-2 rounded-md" />
            </div>

            <div class="info-box self-start py-3 px-2">
                <h2 class="text-lg bg-slate-500 my-2 rounded-md p-3 font-semibold text-white">
                   <span class="inline-block text-slate-900 font-bold">Product Name: </span> ${item.phone_name}
                </h2>
                <h2 class="text-lg bg-slate-500 my-2 rounded-md px-2 font-semibold text-white">
                <span class="inline-block text-slate-900 font-bold">Brand Name: </span> ${item.brand}
                </h2>

                <button class="bg-slate-700 text-slate-100 font-bold px-3 mt-10  py-1 rounded drop-shadow-md font__lobster" onclick="getDetailsById('${item.slug}')" >
                Details
                </button>
            </div>
            
        </div>
    `;
    phoneGridBox.appendChild(div);
    // SPINNER FUNCTION
    spinner("none");
    toggleId("display-phone-search-by-name", "block");
  }
};

// Get Phone Details
const getDetailsById = async (slug) => {
  spinner("block");
  toggleId("display-single-phone-details", "none");
  const baseUrl = `https://openapi.programming-hero.com/api/phone/${slug}`;
  try {
    const request = await fetch(baseUrl);
    const data = await request.json();
    displaySinglePhoneDetails(data.data);
  } catch (err) {
    errMessage(err);
  }
};

const displaySinglePhoneDetails = (singleData) => {
  const singlePhoneBox = document.getElementById("single-phone-box");
  document.body.style.overflow = "hidden";
  singlePhoneBox.textContent = "";
  toggleId("display-single-phone-details", "block");
  // Destructure Object
  const { storage, displaySize, chipSet, memory, sensors } =
    singleData.mainFeatures;
  const div = document.createElement("div");
  div.classList.add("h-screen");
  div.classList.add("overflow-y-auto");
  div.innerHTML = `
    <div class="text-right ">
      <span class="fixed -ml-8 z-50 text-red-700 text-2xl cursor-pointer font-bold" onclick='closeIt()' id="close-it">X</span>
    </div>
    <div class="flex justify-center mb-2 p-4">
        <img src="${
          singleData.image
        }" class="rounded-lg p-2 drop-shadow-lg  bg-white border-8" alt="${
    singleData.name
  }" />
    </div>
    <div class="flex justify-start flex-col items-center gap-2 text-lg pb-10 overflow-x-hidden">
        <h2 class="bg-slate-600 px-3 font-semibold rounded-md">Brand: ${
          singleData.brand
        }</h2>
        <h2>Name: ${singleData.name}</h2>
            <h2>Release Date: ${
              singleData.releaseDate ? singleData.releaseDate : "No Data Found"
            }</h2>
        <h2>chipSet: ${chipSet ? chipSet : "No Data"}</h2>
        <h2>Storage: ${storage ? storage : "No Storage Found"}</h2>
        <h2>Memory: ${memory}</h2>
        <h2 class="text-center">Display Size: ${displaySize}</h2>
        <h2 class="text-center">Sensors: ${sensors}</h2>
    </div>

  `;
  singlePhoneBox.appendChild(div);
  spinner("none");
  toggleId("display-single-phone-details", "block");
};

// Error Message
const errMessage = (text) => {
  const errDiv = document.getElementById("err-msg");
  errDiv.innerHTML = `<h5 class="bg-red-500 text-slate-50 my-3 text-lg border rounded-lg w-4/5 uppercase">${text}</h5>`;
  setTimeout(() => {
    errDiv.textContent = "";
  }, 6000);
};

// ACTIVATE THE CLOSE BUTTON
const closeIt = () => {
  toggleId("display-single-phone-details", "none");
  document.body.style.overflow = "auto";
};
// SPINNER TOGGLE
const spinner = (toggleSpin) => {
  toggleId("spinner-div", toggleSpin);
};

// TOGGLE THE ID

const toggleId = (id, toggleId) => {
  document.getElementById(id).style.display = toggleId;
};
