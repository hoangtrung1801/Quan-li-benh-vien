const donePatientButton = document.querySelector('#done-patient')
const listPatients = document.querySelector('#list-patients');
const patientIsHealing = document.querySelector('#patient-is-healing');

const doctorId = window.location.href.split('/').slice(-1)[0];

window.addEventListener('load', () => {

  showPatientIsHealing();

  donePatientButton.addEventListener('click', donePatient);

  socket.on('doctor-room/reload', (data) => {
    loadPatients();
    showPatientIsHealing();
  });
})

const donePatient = async (e) => {
  e.preventDefault();

  const patientHeal = await fetch(`/api/doctor-room/${doctorId}/done`).then(res => res.json());

  socket.emit('doctor-room/reload');

  showNotifies([ `Congratulation patient ${patientHeal.name} was healed` ]);
}

const loadPatients = async () => {
  listPatients.innerHTML = '';
  let patientsData = (await fetch(`/api/doctor-room/${doctorId}`).then(res => res.json())).patients;

  patientsData.map((patient, idx) => {
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
}

const showPatientIsHealing = async () => {
  let patientsData = (await fetch(`/api/doctor-room/${doctorId}`).then(res => res.json())).patients;
  if(patientsData.length > 0) {
    patientIsHealing.style.display = 'block';
    patientIsHealing.textContent = `Doctor is healing for ${patientsData[0].name}`;
  } else {
    patientIsHealing.style.display = 'none';
  }
}