//Elementos del DOM
let traducirDe = document.querySelector('#traducirDe');
let traducirA = document.querySelector('#traducirA');

//API de los idiomas
const getURL = 'https://text-translator2.p.rapidapi.com/getLanguages'

const OPTIONS = {
    method: 'GET',
    headers: {
		'X-RapidAPI-Key': '440ceabad6msh842eed0c5c8dfb0p1365e1jsn32fc4b43f355',
		'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
	}
}

let source_language = 'es';
let target_language = 'af';


fetch(getURL, OPTIONS)
    .then(res => res.json())
    .then(objeto => {
        let lenguages = objeto.data.languages;
        console.log()
        lenguages.forEach(element => {
            traducirDe.innerHTML += `<option value="${element.code}">${element.name}</option>`
            traducirA.innerHTML += `<option value="${element.code}">${element.name}</option>`
        })
        traducirDe.addEventListener('click', ()=>{
            console.log(traducirDe.value);
            source_language = traducirDe.value;
        });
        traducirA.addEventListener('click', ()=>{
            console.log(traducirA.value);
            target_language = traducirA.value
        });
    })
    .catch(error => console-log(error))

//enviar datos al servidor
let traducir = document.querySelector('#traducir');
let outputTraducir = document.querySelector('#outputTraducir')

traducir.addEventListener('click', ()=>{
    let inputTraducir = document.querySelector('#inputTraducir');
    let textoATraducir = inputTraducir.value;

    const encodedParams = new URLSearchParams();
    encodedParams.append("source_language", source_language);
    encodedParams.append("target_language", target_language);
    encodedParams.append("text", textoATraducir);

    const options = {
	    method: 'POST',
	    headers: {
		    'content-type': 'application/x-www-form-urlencoded',
		    'X-RapidAPI-Key': '440ceabad6msh842eed0c5c8dfb0p1365e1jsn32fc4b43f355',
		    'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
	    },
	    body: encodedParams
        };

    fetch('https://text-translator2.p.rapidapi.com/translate', options)
	    .then(response => response.json())
	    .then(response => outputTraducir.innerText =response.data.translatedText)
	    .catch(err => console.error(err));
})

