const nextLobby = document.querySelector("#next-lobby");
const donePatient = document.querySelector("#done-patient");
const nextPatient = document.querySelector('#next-patient')

if (nextLobby) {
    nextLobby.addEventListener("click", () => {
        alert("Patient was moved in reception");
        post('/lobby');
    });
}

if (donePatient) {
    donePatient.addEventListener("click", () => {
        alert("Congratulation! Patient was healed");
    });
}

if (nextPatient) {
    nextPatient.addEventListener('click', () => post('/reception'));
}

function post(path, params = {}, method = 'post') {

    // The rest of this code assumes you are not using a library.
    // It can be made less verbose if you use one.
    const form = document.createElement('form');
    form.method = method;
    form.action = path;

    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            const hiddenField = document.createElement('input');
            hiddenField.type = 'hidden';
            hiddenField.name = key;
            hiddenField.value = params[key];

            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
}
