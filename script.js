let villeChoisie; 

function erreur() {
    villeChoisie = "Paris";
    recevoirTemp(villeChoisie)
}

if ("geolocation" in navigator) {
    navigator.geolocation.watchPosition((position) => {
        const url = 'https://api.openweathermap.org/data/2.5/weather?lon=' + position.coords.longitude + "&lat=" + position.coords.latitude + '&appid=ae83538b99ec8c4734b4f6e074ee768f&units=metric';

        let requete = new XMLHttpRequest();

        requete.open("GET", url); 

        requete.responseType = "json"; 

        requete.send(); 


        requete.onload =  function() {
            if (requete.readyState === XMLHttpRequest.DONE) {
                if(requete.status === 200) {
                    let response = requete.response; 
                    let temp = response.main.temp;
                    let ville = response.name;
                    document.querySelector("#temperature_label").textContent = temp;
                    document.querySelector("#ville").textContent = ville;
                } else {
                    alert("Un problème est intervenu, merci de revenir plus tard.")
                }
            }
        }
    }, erreur, options);

} else {
    villeChoisie = "Paris";
    recevoirTemp(villeChoisie)
}

var options = {
    enableHighAccuracy: true
}

btn = document.querySelector("#changer");
btn.addEventListener("click", () => {
    let villeChoisie = prompt("Quel est la ville dont vous voulez connaitre la météo ?");
    recevoirTemp(villeChoisie);
})

function recevoirTemp(ville) {
    //let ville = "Tokyo";

    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + ville + '&appid=ae83538b99ec8c4734b4f6e074ee768f&units=metric';

    let requete = new XMLHttpRequest();

    requete.open("GET", url); 

    requete.responseType = "json"; 

    requete.send(); 


    requete.onload =  function() {
        if (requete.readyState === XMLHttpRequest.DONE) {
            if(requete.status === 200) {
                let response = requete.response; 
                let temp = response.main.temp;
                document.querySelector("#temperature_label").textContent = temp;
                document.querySelector("#ville").textContent = ville;
            } else {
                alert("Un problème est intervenu, merci de revenir plus tard.")
            }
        }
    }
}