// Get Phone Api By search

const getPhoneApi = async () => {
  const inputBox = document.getElementById("search-input");
  const inputValue = inputBox.value;
  if (inputValue === "") {
    errMessage("Give A valid Phone Name!");
    inputBox.value = "";
  } else {
    const baseUrl = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`;
    try {
      const request = await fetch(baseUrl);
      const phoneData = await request.json();
      if (phoneData.data.length === 0) {
        errMessage(`No Data Found in ${inputValue} Please Try Another `);
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
  const phoneGridBox = document.getElementById("phone-grid-box");
  phoneGridBox.innerText = "";
  const firstTwentyItems = result.slice(0, 20);
  for (const item of firstTwentyItems) {
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="flex justify-around items-center border-2 rounded-md mx-auto w-11/12">
            <div class="images py-3">
                <img src="${item.image}" alt="" />
            </div>

            <div class="info-box self-start py-3 px-2">
                <h2>
                <span class="block">Product Name: </span>${item.phone_name}</h2>
                <h2>
                <span class="inline-block">Brand Name: </span> ${item.brand}</h2>

                <button class="bg-slate-700 text-slate-100 font-bold px-3 py-1 rounded drop-shadow-md font__lobster" onclick="getDetailsById('${item.slug}')" >
                Details
                </button>
            </div>
            
        </div>
    `;
    phoneGridBox.appendChild(div);
  }
};

// Get Phone Details
const getDetailsById = async (slug) => {
  const baseUrl = `https://openapi.programming-hero.com/api/phone/${slug}`;
  try {
    const request = await fetch(baseUrl);
    const data = await request.json();
    console.log(data.data);
  } catch (err) {
    errMessage(err);
  }
};

getPhoneApi();

// Error Message
const errMessage = (text) => {
  const errDiv = document.getElementById("err-msg");
  errDiv.innerHTML = `<h5 class="bg-red-500 text-slate-50 my-3 text-lg border rounded-lg w-4/5 uppercase">${text}</h5>`;
  setInterval(() => {
    errDiv.innerText = "";
  }, 3000);
};
