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

// prevent resubmition
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

function post(path, params = {}, method = 'post') {

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

