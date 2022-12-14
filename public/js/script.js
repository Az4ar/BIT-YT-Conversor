let Btn = document.getElementById('btn');
let URLinput = document.querySelector('.URL-input');
let select = document.querySelector('.opt');
let serverURL = 'http://127.0.0.1:4000';

Btn.addEventListener('click', () => {
	if (!URLinput.value) {
		alert('O Campo abaixo não pode ser vazio!');
	} else {
		if (select.value == 'mp3') {
			downloadMp3(URLinput.value);
		} else if (select.value == 'mp4') {
			downloadMp4(URLinput.value);
		}
	}
});

async function downloadMp3(query) {
	const res = await fetch(`${serverURL}/videomp3?url=${query}`);
	if(res.status == 200) {
		var a = document.createElement('a');
  		a.href = `${serverURL}/videomp3?url=${query}`;
  		a.setAttribute('video', '');
		a.click();
	} else if(res.status == 400) {
		alert(`A url **${URLinput.value}** É invalida!!!`);
	}
}

async function downloadMp4(query) {
	const res = await fetch(`${serverURL}/videomp4?url=${query}`);
	if(res.status == 200) {
		var a = document.createElement('a');
  		a.href = `${serverURL}/videomp4?url=${query}`;
  		a.setAttribute('video', '');
		a.click();
	} else if(res.status == 400) {
		alert(`A url **${URLinput.value}** É invalida!!`);
	}
}
