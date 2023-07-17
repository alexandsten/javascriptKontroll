// globala variabler
let doneList
let messageElem
let textActiv

let init = () => {   // funktion som startar när sidan har laddat klart
    // globala variabler får respektive element
    doneList = document.getElementById("listDone")
    messageElem = document.getElementById("messages")
    textActiv  = document.getElementById("textToDo")
    //  hämta element med id
    let btnActiv  = document.getElementById("addToDo")
    let resetActiv = document.getElementById("resetToDo")
    let activList = document.getElementById("listToDo")

   // händelsehanterare för knappen som skapar aktivitet
   //kallar på create metoden från activity objekt
    btnActiv.addEventListener('click', function(event) {
            event.preventDefault()
            // om textfältet är tomt visas istället ett felmeddelande
            if (textActiv.value != "") {
            // färdig aktivitet läggs in i "att göra" listan
            activList.append(activity.create(textActiv.value)); 
            messageElem.innerText = ""
            } else {
                messageElem.innerText = "Du måste ange din aktivitet"
            }
    }) 
    // händelsehanterare för återställ knappen
    // tillåter användaren att återställa bägge listor
    resetActiv.addEventListener('click', function(event) {
        event.preventDefault()
        activList.innerHTML = "";
        doneList.innerHTML = "";
    })
}

window.addEventListener("load",init);   // anropar init när sidan laddar klart

/// aktivitet objekt
const activity = {

    // metod som skapar aktivitet
    create : function(activName) {    
        // skapar element för aktivitet
        let liActiv = document.createElement('li');        
        let changeActiv = document.createElement('button');
        let doneActiv = document.createElement('button');
        let deleteActiv = document.createElement('button');
        let textActiv = document.createElement('input');

        // namnger knappar
        changeActiv.innerHTML = "Ändra"
        doneActiv.innerHTML = "Färdig"
        deleteActiv.innerHTML = "Radera"

        // anger attribut till textfält elementet
        textActiv.setAttribute('type', 'text');
        textActiv.setAttribute('value', activName);
        textActiv.setAttribute('disabled', '');

        // händelsehanterare för ändra knappen, kallar på "change" metod
        changeActiv.addEventListener('click', function(event) {
            activity.change(this.parentNode)
        }) 

        // händelsehanterare för radera knappen, kallar på "delete" metod
        deleteActiv.addEventListener('click', function(event) {
            activity.delete(this.parentNode)
        }) 

        // händelsehanterare för färdig knappen, kallar på "done" metod
        doneActiv.addEventListener('click', function(event) {
            activity.done(this.parentNode) 
        }) 

        // lägger in alla skapade element i ett li element, som sedan returneras
        liActiv.append(textActiv, changeActiv, doneActiv, deleteActiv);
        return liActiv;
        }, 

        // metod som tillåter användaren att låsa och låsa upp textfält
        change : function(event) {  
            let inputText = event.getElementsByTagName("input");
            let changeButton = event.getElementsByTagName("button")
            messageElem.innerText = ""
            
            // textfältet måste vara ifyllt när de låses
            // ändra knappen bytes ut till "spara" när den klickas på
            if (inputText[0].value == "") {
                messageElem.innerText = "Du måste ange din syssla i textfältet"
            } else if (inputText[0].getAttribute('disabled') != null){
                inputText[0].removeAttribute('disabled')
                changeButton[0].innerText = "Spara"
            } else {
                inputText[0].setAttribute('disabled', '');
                changeButton[0].innerText = "Ändra"
            }
        },

        // metod som anger att aktiviteten är klar, och flyttar den till "färdiga" listan 
        done : function(event) { 
            let inputText = event.getElementsByTagName("input");
            // textfältet måste vara ifyllt när en aktivitet blir färdig
            if (inputText[0].value == "") {
                messageElem.innerText = "Du måste ange din syssla i textfältet"
            } else {
            let activButtons = event.getElementsByTagName("button")
            activButtons[1].remove(); // tar bort "färdig" knappen
            doneList.append(event);
            messageElem.innerText = ""
            }
        },

        // metod som tar bort aktiviteten som användaren klickat på
        delete : function(event) { 
            event.remove();
    }
};