// Get Phone Api By search

const getPhoneApi = async () => {
  const baseUrl = `https://openapi.programming-hero.com/api/phones?search=samsung`;
};

// Get The Input Value
const inputField = () => {
  const inputBox = document.getElementById("search-input");
  try {
    if (inputBox.value === "") {
      errMessage("Pleas Input your Phone Name !");
    } else {
      console.log(inputBox.value);
    }
  } catch (err) {
    errMessage(err);
  }
};

// Error Message
const errMessage = (text) => {
  const errDiv = document.getElementById("err-msg");
  errDiv.innerHTML = `<h5 class="bg-red-500 text-slate-50 my-3 text-lg border rounded-lg w-4/5 uppercase">${text}</h5>`;
  setInterval(() => {
    errDiv.innerText = "";
  }, 3000);
};
