const api = "https://swapi.dev/api/";

inicializar();

function inicializar() {
  document.querySelector("#btnPersonajes").addEventListener("click", verPersonajes);
  document.querySelector("#btnPlanetas").addEventListener("click", verPlanetas);
  document.querySelector("#btnPeliculas").addEventListener("click", verPeliculas);
}

//#region Personajes


async function verPersonajes() {
  try {
    await obtenerPersonajes();
  } catch (error) {
    console.log(error.Message);
  }
}

async function obtenerPersonajes() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch(api + "/people/", requestOptions)
    .then(response => response.json())
    .then(async resp => {
      let card = "";

      for (let i = 0; i < resp.results.length; i++) {
        const planeta = await obtenerPlanetaURL(resp.results[i].homeworld);
        card += "<tr><td> " + resp.results[i].name + "</td><td> " + resp.results[i].birth_year + "</td><td> " + resp.results[i].height + "</td><td> " + planeta + "</td></tr>";
      }
      document.querySelector("#tablaPersonajes").innerHTML = card;
    })
    .catch(error => console.log('error', error));
}

async function obtenerPlanetaURL(url) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  return fetch(url, requestOptions)
    .then(response => response.json())
    .then(resp => {
      console.log(resp.name);
      return resp.name;
    })
    .catch(error => {
      console.log('error', error);
      return '';
    });
}

//#endregion


//#region Planetas
async function verPlanetas(){
    try{
        await obtenerPlanetas();
    }
    catch(error){
        console.log(error.message);
    }
}

async function obtenerPlanetas() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
  
    fetch(api + "/planets/", requestOptions)
      .then(response => response.json())
      .then(async resp => {
        let card = "";
  
        for (let i = 0; i < resp.results.length; i++) {
          card += "<tr><td> " + resp.results[i].name + "</td><td> " + resp.results[i].terrain + "</td><td> " + resp.results[i].population + "</td></tr>";
        }
        document.querySelector("#tablaPlanetas").innerHTML = card;
      })
      .catch(error => console.log('error', error));
  }
//#endregion

//#region Peliculas
async function verPeliculas(){
    try{
        await obtenerPeliculas();
    }
    catch(error){
        console.log(error.message);
    }
}

async function obtenerPeliculas() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
  
    fetch(api + "/films/", requestOptions)
      .then(response => response.json())
      .then(async resp => {
        let card = "";
  
        for (let i = 0; i < resp.results.length; i++) {
          card += "<tr><td> " + resp.results[i].title + "</td><td> " + resp.results[i].episode_id + "</td><td> " + resp.results[i].release_date + "</td></tr>";
        }
        document.querySelector("#tablaPeliculas").innerHTML = card;
      })
      .catch(error => console.log('error', error));
  }
//#endregion