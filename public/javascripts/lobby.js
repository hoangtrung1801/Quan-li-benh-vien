const container = document.querySelector('.container');
const medicalRegister = document.querySelector('#medical-register');
const name = document.querySelector('#name');
const age = document.querySelector('#age');
const address = document.querySelector('#address');
const diseaseId = document.querySelector('#diseaseId');
const listPatients = document.querySelector('#list-patients');
const anotherPatients = document.querySelector('#another-patient');
const nextLobby = document.querySelector("#next-lobby");

window.addEventListener('load', () => {
  // showPatients();

  medicalRegister.addEventListener('click', registerSubmit);
  nextLobby.addEventListener('click', nextPatientToReception);

  socket.on('lobby/submit', (data) => {
    showPatients();
  })
  socket.on('lobby/next', () => {
    showPatients();
  })

  if (anotherPatients.textContent.split(' ')[1] === '0') {
    anotherPatients.style.display = 'none';
  }
})

const registerSubmit = async (e) => {
  e.preventDefault();
  let data = {
    name: name.value,
    age: age.value,
    address: address.value,
    diseaseId: diseaseId.value
  }

  await fetch('/api/lobby', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify(data)
  })

  name.value = '';
  age.value = '';
  address.value = '';
  diseaseId.value = '';

  socket.emit('lobby/submit', data);
}

const nextPatientToReception = async (e) => {
  e.preventDefault();

  await fetch('/api/lobby/next')

  socket.emit('lobby/next');
}

const showPatients = async () => {
  listPatients.innerHTML = "";
  let patientsData = await fetch('/api/lobby').then(res => res.json());
  let anotherPatientsCount = patientsData.length - 3;
  patientsData = patientsData.slice(0, 3);
  patientsData
    .sort((a, b) => {
      if (a.priority === b.priority)
        return a.date > b.date ? 1 : -1;
      return parseInt(a.priority) > parseInt(b.priority) ? 1 : -1;
    })
    .map((patient, idx) => {
      let row = document.createElement('tr');
      let colId = document.createElement('th');
      colId.textContent = idx + 1;
      let colName = document.createElement('td');
      colName.textContent = patient.name;
      let colAge = document.createElement('td');
      colAge.textContent = patient.age;
      let colAddress = document.createElement('td');
      colAddress.textContent = patient.address;
      let colDisease = document.createElement('td');
      colDisease.textContent = patient.disease;

      row.appendChild(colId);
      row.appendChild(colName);
      row.appendChild(colAge);
      row.appendChild(colAddress);
      row.appendChild(colDisease);

      listPatients.appendChild(row)
    })
  if(anotherPatientsCount > 0) {
    anotherPatients.textContent = `and ${anotherPatientsCount} others...`;
    anotherPatients.style.display = 'block';
  }

  if(patientsData.length) {
    nextLobby.classList.remove('disabled');
  }
}
