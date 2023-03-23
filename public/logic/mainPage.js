const subButton = document.getElementsByClassName("form_button");
const formText = document.querySelector(".form_input");
// console.log(formText)
// console.log(subButton[0]);
// console.log(subButton[0]);

const getTheSub = (e) => {
  e.preventDefault();
  // console.log(e.view.navigation.currentEntry.url);
  const currentUrl = e.view.navigation.currentEntry.url;

  fetch(currentUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: formText.value.toString() }),
  });
};

subButton[0].addEventListener("click", getTheSub);
