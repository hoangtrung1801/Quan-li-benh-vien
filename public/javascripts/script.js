const socket = io();
const notifiesDiv = document.querySelector('#notifies');

const showNotifies = (notifies) => {
    notifies.map(notify => {
        let alert = document.createElement('div');
        alert.className = 'alert alert-info';
        alert.textContent = notify;

        notifiesDiv.appendChild(alert);
        setTimeout(() => {
            notifiesDiv.removeChild(alert);
        }, 5000);
    })
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