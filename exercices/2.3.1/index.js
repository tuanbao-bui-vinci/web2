let myForm = document.querySelector("form");

const onSubmit = (e) => {
    console.log("onSubmit::");
    e.preventDefault();
  };
  
  myForm.addEventListener("submit", onSubmit);


  