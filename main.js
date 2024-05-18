// Grab a couple of things
const section = document.querySelector('section');

let movimientos = 0;
let aciertos = 0;
let saveUsername;
let saveEmail;
var time;
var segundos = 0;

// Apuntar a docunmento HTML
let mostrarMovimientos = document.getElementById("movimientos");
let mostrarAciertos = document.getElementById("aciertos");
let iniciar = document.getElementById("iniciar");
let username = document.getElementById("username");
let email = document.getElementById("Email");
let acierto = document.getElementById("acierto");
let fallo = document.getElementById("fallo");
let juegoGanado = document.getElementById("ganarJuego");

// Generate the data
const getData = () => [
    { imgSrc: "./Recursos/1.jpg", name: "luigi"},
    { imgSrc: "./recursos/2.jpeg", name: "cacaita"},
    { imgSrc: "./recursos/3.jpg", name: "peppa"},
    { imgSrc: "./recursos/4.jpg", name: "rana"},
    { imgSrc: "./recursos/5.jpg", name: "gigaChad"},
    { imgSrc: "./recursos/6.jpg", name: "calamardo"},
    { imgSrc: "./recursos/10.gif", name: "ricardo"},
    { imgSrc: "./recursos/8.jpg", name: "gato"},
    { imgSrc: "./Recursos/1.jpg", name: "luigi"},
    { imgSrc: "./recursos/2.jpeg", name: "cacaita"},
    { imgSrc: "./recursos/3.jpg", name: "peppa"},
    { imgSrc: "./recursos/4.jpg", name: "rana"},
    { imgSrc: "./recursos/5.jpg", name: "gigaChad"},
    { imgSrc: "./recursos/6.jpg", name: "calamardo"},
    { imgSrc: "./recursos/10.gif", name: "ricardo"},
    { imgSrc: "./recursos/8.jpg", name: "gato"}
]

// Randomize
const randomize = () => {
    const cardDarta = getData();
    cardDarta.sort(()=> Math.random() - 0.5);
    console.log(cardDarta);
    return cardDarta;
};


// Card Generator Function
const cardGenerator = () => {
    const cardDarta = randomize();
    // Generate the HTM
    cardDarta.forEach((item) => {
        const card = document.createElement("div");
        const face = document.createElement("img");
        const back = document.createElement("div");
        card.classList = "card";
        face.classList = "face";
        back.classList = "back"
        // Attach the cards to the cards
        face.src =item.imgSrc;
        card.setAttribute("name", item.name);
        // Attach the cards to the section
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);
        card.addEventListener("click", (e) => {
            card.classList.toggle("toggleCard")
            checkCards(e)
        });
    });
};

// Check Cards
const checkCards = (e) => {
    console.log(e);
    const clickedCard = e.target;
    console.log(clickedCard);
    clickedCard.classList.add("flipped");
    const flippedCards = document.querySelectorAll('.flipped');
    // Logic
    if(flippedCards.length === 2){
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
        if(flippedCards[0].getAttribute('name') == flippedCards[1].getAttribute('name')){
            console.log("match");
            
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`
            acierto.style.display="block";
            setTimeout(()=>{
                acierto.style.display="none";
            }, 1000);
            
            if(aciertos == 8){
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 😱`
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} 🤘😎`
                juegoGanado.style.display="block"
                estadisticas();
                finalizarJuego();
            }
            flippedCards.forEach((card) => {
                card.classList.remove("flipped");
                card.style.pointerEvents = "none"
            });
        }else{
            console.log("wrong");
            fallo.style.display="block";
            flippedCards.forEach((card) => {
                card.classList.remove('flipped');
                setTimeout(() => card.classList.remove("toggleCard"), 1000);
            });
            setTimeout(()=>{
                fallo.style.display="none";
            }, 1000);
        }
    }
};
cardGenerator();

window.onload = () =>{
    $("section").hide();
    let auxSVusername = localStorage.getItem("Username");
    let auxSVemail = localStorage.getItem("Email");
    
    if(auxSVemail == undefined && auxSVusername == undefined){
        $("#invalido").hide();
        inicioSesion();
        $("#iniciarbtn").hide()
    }else{
        $("#invalido").hide();
        $("#formulario").hide();
        $("#iniciarbtn").show()
        $(".accordion").css('display', 'block');
        tiempoRecord = localStorage.getItem("tiempoRecord");
        ultimaPartida = localStorage.getItem("tiempoUltimaJugada");
        jugador = localStorage.getItem("Username")
        jugador = document.getElementById("jugador").innerHTML = `Jugador : ${jugador}`;
        mostrarTiempo = document.getElementById("conEstadistica").innerHTML = `Tiempo record1: ${tiempoRecord}`;
        tUltimaPartida = document.getElementById("tUltimaPartida").innerHTML = `Tiempo ultima partida1: ${ultimaPartida}`;
        estadisticas();
        iniciarJuego();
    }
}

function inicioSesion(){
    iniciar.addEventListener("click", ()=>{
        saveUsername = username.value;
        saveEmail = email.value;
        var ExpRegEmail=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
        let em = saveEmail.toString(); 
        
        if(em.match(ExpRegEmail)==null){
            console.log("Email Invalido");
            $("#invalido").show()
        }else{
            localStorage.setItem("Username", saveUsername);
            localStorage.setItem("Email", saveEmail);
            localStorage.setItem("tiempoRecord", 86400)
            localStorage.setItem("tiempoUltimaJugada", 0);
            $("#invalido").hide();
            $("#formulario").hide();
            $("#iniciarbtn").show();
            $(".accordion").css('display', 'block');
            $("#sinEstadistica").css('display', 'block');
            iniciarJuego();
        }
    })
}

function iniciarJuego(){
    $("#iniciarbtn").on("click", ()=>{
        $("#iniciarSesion").hide();
        $("section").show();
        contadorTiempo();
    })
}

function finalizarJuego(){
    clearTimeout(time);
    clearInterval(time);
}

function contadorTiempo(){
    cronometro = document.getElementById("cronometro").innerHTML = `Tiempo: ${segundos}`;
    segundos++;
    time = setTimeout("contadorTiempo()", 1000);
    
    // Ultima partida
    localStorage.setItem("tiempoUltimaJugada", segundos-1);
    
}

function estadisticas(){
    tiempoRecord = localStorage.getItem("tiempoRecord");
    ultimaPartida = localStorage.getItem("tiempoUltimaJugada");
    console.log("en la funcion")
    // Comparacion Principal
    if(tiempoRecord == 86400){
        console.log("en la funcion2")
        tiempoRecord = ultimaPartida;
        localStorage.setItem("tiempoRecord", tiempoRecord)
        jugador = localStorage.getItem("Username")
        jugador = document.getElementById("jugador").innerHTML = `Jugador : ${jugador}`;
        mostrarTiempo = document.getElementById("conEstadistica").innerHTML = `Tiempo record2: ${tiempoRecord}`;
        tUltimaPartida = document.getElementById("tUltimaPartida").innerHTML = `Tiempo ultima partida2: ${ultimaPartida}`;
    }else if(ultimaPartida<tiempoRecord){
        localStorage.setItem("tiempoRecord", ultimaPartida)
        jugador = localStorage.getItem("Username")
        jugador = document.getElementById("jugador").innerHTML = `Jugador : ${jugador}`;
        mostrarTiempo = document.getElementById("conEstadistica").innerHTML = `Tiempo record3: ${ultimaPartida}`;
        tUltimaPartida = document.getElementById("tUltimaPartida").innerHTML = `Tiempo ultima partida3: ${ultimaPartida}`;
    }else{
        tUltimaPartida = document.getElementById("tUltimaPartida").innerHTML = `Tiempo ultima partida4: ${ultimaPartida}`;
    }
    
    
}