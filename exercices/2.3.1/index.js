const myForm = document.querySelector("form");
const wish = document.querySelector("#text1");
const divMessage = document.querySelector("#message");


myForm.addEventListener("submit",(e) => {
    console.log("onSubmit::");
    e.preventDefault();
    myForm.style.display = "none";
    divMessage.textContent = `Your wish is : ${wish.value}`;
});


  