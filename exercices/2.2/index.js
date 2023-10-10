const buttons = document.querySelector("#click1");
const count = document.querySelector("#click2");

let cpt = 0;


window.addEventListener("click", () => {
      cpt++;
      buttons.innerText = "Hello world!";
      count.innerText = "Vous avez cliqué: "+ cpt;
      if(cpt >=5){
        buttons.innerText = "Bravo, bel échauffement !";
        count.innerText = "Vous avez cliqué: "+ cpt;
      };
      if(cpt >= 10){
        buttons.innerText = "Vous êtes passé maître en l'art du clic !"
        count.innerText = "Vous avez cliqué: "+ cpt;
      };
      
});


