// solo hacer una colision mokepon

const divResultadoCombate = document.getElementById('resultado')

const botonMascotaJugador = document.getElementById('boton-mascota')

const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")

const sectionReiniciar = document.getElementById("reiniciar")
sectionReiniciar.style.display = "none"


const spanMascotaJugador = document.getElementById('mascota-jugador')

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')
const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigos = document.getElementById('vidas-enemigo')

const ataqueDelJugador = document.getElementById('ataques-del-jugador')
const ataqueDelEnemigo = document.getElementById('ataques-del-enemigo')

const contenedorTarjetas = document.getElementById('contenedor-tarjetas')
const contenedorAtaques = document.getElementById('contendor-ataques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let jugadorId

let mokepones = []
let victoriasJugador = 0
let victoriasEnemigo = 0

let opcionMokepones
let ataquesMokepon

let inputCapipepo
let inputRatigueya
let inputHipodoge

let botonFuego
let botonAgua
let botoTierra
let botonReiniciar
let botones = []

let ataqueJugador = []
let ataqueEnemigo = []

let ataquesMokeponAleatorio
let ataquesMokeponEnemigo

let mascotaJugador
let mascotaJugadorObjeto

let indexAtaqueJugador
let indexAtaqueEnemigo

let lienzo = mapa.getContext("2d")
let intervalo

let mapaBackground = new Image()
mapaBackground.src = './img/mokemap.png'
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 550
if (anchoDelMapa > anchoMaximoDelMapa) { anchoDelMapa = anchoMaximoDelMapa - 20 }
alturaQueBuscamos = anchoDelMapa * 600 / 800
mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos


class Mokepon {
    constructor(nombre, foto, vidas, fotoMapa) {
        this.nombre = nombre
        this.foto = foto
        this.vidas = vidas
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.ancho = 50
        this.alto = 50
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let capipepo = new Mokepon('Capipepo', './img/mokepons_mokepon_capipepo_attack.png', 5, './img/capipepo.png')
let hipodoge = new Mokepon('Hipodoge', './img/mokepons_mokepon_hipodoge_attack.png', 5, './img/hipodoge.png')
let ratigueya = new Mokepon('Ratigueya', './img/mokepons_mokepon_ratigueya_attack.png', 5, './img/ratigueya.png')

let capipepoEnemigo = new Mokepon('Capipepo', './img/mokepons_mokepon_capipepo_attack.png', 5, './img/capipepo.png')
let hipodogeEnemigo = new Mokepon('Hipodoge', './img/mokepons_mokepon_hipodoge_attack.png', 5, './img/hipodoge.png')
let ratigueyaEnemigo = new Mokepon('Ratigueya', './img/mokepons_mokepon_ratigueya_attack.png', 5, './img/ratigueya.png',)

capipepo.ataques.push(
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
)

capipepoEnemigo.ataques.push(
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
)

hipodoge.ataques.push(
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🔥', id: 'boton-fuego' },
)

hipodogeEnemigo.ataques.push(
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🔥', id: 'boton-fuego' },
)

ratigueya.ataques.push(
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '💧', id: 'boton-agua' },
)

ratigueyaEnemigo.ataques.push(
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '💧', id: 'boton-agua' },
)

mokepones.push(hipodoge, capipepo, ratigueya)

function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = "none"
    sectionVerMapa.style.display = "none"

    mokepones.forEach((mokepon) => {
        opcionMokepones = `
        <input class="input-tarjeta-mokepon" type="radio" name="mascota" id=${mokepon.nombre} />
            <label class="tarjeta-mokepon" for=${mokepon.nombre} >
                <p class="text-tarjeta-pokemon">${mokepon.nombre}</p>
                <img src=${mokepon.foto}  alt=${mokepon.nombre} >
            </label>
        `

        contenedorTarjetas.innerHTML += opcionMokepones
    })

    inputCapipepo = document.getElementById('Capipepo')
    inputRatigueya = document.getElementById('Ratigueya')
    inputHipodoge = document.getElementById('Hipodoge')

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    botonReiniciar = document.getElementById('boton-reiniciar')
    botonReiniciar.addEventListener('click', reiniciarJuego)

    unirseAlJuego()
}

function unirseAlJuego() {
    fetch("http://localhost:8080/unirse")
        .then(function (res) {
            if (res.ok) {
                res.text()
                    .then(function (respuesta) {
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}

function seleccionarMascotaJugador() {
    if (inputHipodoge.checked) {
        mascotaJugador = inputHipodoge.id
    } else if (inputCapipepo.checked) {
        mascotaJugador = inputCapipepo.id
    } else if (inputRatigueya.checked) {
        mascotaJugador = inputRatigueya.id
    }

    if (mascotaJugador) {
        seleccionarMokepon(mascotaJugador)
        sectionSeleccionarMascota.style.display = 'none'
        sectionVerMapa.style.display = "flex"
        sectionMapa()
        spanMascotaJugador.innerHTML = mascotaJugador
        botonMascotaJugador.disabled = true
        extraerAtaques(mascotaJugador)

    } else {
        alert("seleccione una mascota")
    }
}



function seleccionarMokepon(mascotaJugador) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}`,
        {
            method: "post", 
            headers: { 
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({ 
                mokepon: mascotaJugador 
            })
        })
}


function extraerAtaques(mascotaJugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador == mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesMokepon = `<button id=${ataque.id} class="boton-ataque-mascota BAtaque">${ataque.nombre}</button>`

        contenedorAtaques.innerHTML += ataquesMokepon
    })

    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')
    botoTierra = document.getElementById('boton-tierra')
    botones = document.querySelectorAll('.BAtaque')
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent == "🔥") {
                ataqueJugador.push('FUEGO')
                boton.style.background = '#560272'
                boton.disabled = true
            } else if (e.target.textContent == "💧") {
                ataqueJugador.push('AGUA')
                boton.style.background = '#560272'
                boton.disabled = true
            } else if (e.target.textContent == "🌱") {
                ataqueJugador.push('TIERRA')
                boton.style.background = '#560272'
                boton.disabled = true
            }
            console.log(ataqueJugador)
            ataqueAleatorioEnemigo()
        })
    })
}

function seleccionarMascotaEnemigo(enemigo) {
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques

    secuenciaAtaque()
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1)
    ataque = ataquesMokeponEnemigo[ataqueAleatorio].nombre
    ataquesMokeponEnemigo.splice(ataqueAleatorio, 1)

    if (ataque == "🔥") {
        ataqueEnemigo.push("FUEGO")
    } else if (ataque == "💧") {
        ataqueEnemigo.push("AGUA")
    } else if (ataque == "🌱") {
        ataqueEnemigo.push("TIERRA")
    }


    console.log(ataqueEnemigo)
    console.log(ataque)


    iniciarCombate()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function iniciarCombate() {
    if (ataqueJugador.length == 5) {
        combate()
    }
}

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {

    for (let i = 0; i < ataqueJugador.length; i++) {
        if (ataqueJugador[i] == ataqueEnemigo[i]) {
            indexAmbosOponentes(i, i)
            crearMensajes("EMPATE")
        } else if (ataqueJugador[i] == "FUEGO" && ataqueEnemigo[i] == "TIERRA") {
            indexAmbosOponentes(i, i)
            crearMensajes("GANADOR")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[i] == "AGUA" && ataqueEnemigo[i] == "FUEGO") {
            indexAmbosOponentes(i, i)
            crearMensajes("GANADOR")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[i] == "TIERRA" && ataqueEnemigo[i] == "AGUA") {
            indexAmbosOponentes(i, i)
            crearMensajes("GANADOR")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosOponentes(i, i)
            crearMensajes("PERDEDOR")
            victoriasEnemigo++
            spanVidasEnemigos.innerHTML = victoriasEnemigo
        }
    }

    verificarVidas()
}

function verificarVidas() {
    if (victoriasJugador == victoriasEnemigo) {
        crearMensajeFinal("Han empatado")
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("!!Felicidades has ganado~!!")
    } else {
        crearMensajeFinal("Lo siento, has perdido")
    }
}

function crearMensajes(resultado) {
    let nuevoAtaqueJugador = document.createElement('p')
    let nuevoAtaqueEnemigo = document.createElement('p')

    nuevoAtaqueJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueEnemigo.innerHTML = indexAtaqueEnemigo

    divResultadoCombate.innerHTML = resultado

    ataqueDelJugador.appendChild(nuevoAtaqueJugador)
    ataqueDelEnemigo.appendChild(nuevoAtaqueEnemigo)
}

function crearMensajeFinal(resultado) {
    divResultadoCombate.innerHTML = resultado

    botonFuego.disabled = true
    botonAgua.disabled = true
    botoTierra.disabled = true

    sectionReiniciar.style.display = "block"
}

function reiniciarJuego() {
    location.reload()
}

function pintarCanvas() {
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarMokepon()

    enviarPosicion(mascotaJugadorObjeto.x,mascotaJugadorObjeto.y)

    hipodogeEnemigo.pintarMokepon()
    ratigueyaEnemigo.pintarMokepon()
    capipepoEnemigo.pintarMokepon()
    if (
        mascotaJugadorObjeto.velocidadX != 0 ||
        mascotaJugadorObjeto.velocidadY != 0
    ) {
        revisarColision(hipodogeEnemigo)
        revisarColision(ratigueyaEnemigo)
        revisarColision(capipepoEnemigo)
    }
}

function enviarPosicion(x,y){
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
}

function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5
    pintarCanvas()
}

function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5
    pintarCanvas()
}

function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5
    pintarCanvas()
}

function moverArriba() {
    mascotaJugadorObjeto.velocidadY = -5
    pintarCanvas()
}

function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event) {
    switch (event.key) {
        case 'ArrowUp': moverArriba()
            break
        case 'ArrowDown': moverAbajo()
            break
        case 'ArrowLeft': moverIzquierda()
            break
        case 'ArrowRight': moverDerecha()
            break
        default: break
    }
}


function sectionMapa() {
    //mapa.width = 600
    //mapa.height = 400
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    console.log(mascotaJugadorObjeto, mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener('keydown', sePresionoUnaTecla)
    window.addEventListener('keydown', detenerMovimiento)
}

function obtenerObjetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador == mokepones[i].nombre) {
            return mokepones[i]
        }
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota =
        mascotaJugadorObjeto.y
    const abajoMascota =
        mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota =
        mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota =
        mascotaJugadorObjeto.x

    if (
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return
    }

    detenerMovimiento()
    clearInterval(intervalo)
    sectionVerMapa.style.display = "none"
    alert("Hay colision con " + enemigo.nombre)
    sectionSeleccionarAtaque.style.display = "flex"
    seleccionarMascotaEnemigo(enemigo)
}

window.addEventListener('load', iniciarJuego)