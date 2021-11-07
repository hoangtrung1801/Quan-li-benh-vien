const listPatients = document.querySelector('#list-patients')
const listDoctors = document.querySelector('#list-doctors');
const nextReception = document.querySelector('#next-reception');

window.addEventListener('load', () => {

  nextReception.addEventListener('click', nextPatientToDoctor);

  socket.on('reception/reload', (data) => {
    loadDoctors();
    loadPatients();
    if(data) {
      showNotifies(data.notifies);
    }
  });

})

const loadPatients = async () => {
  listPatients.innerHTML = '';
  let patientsData = await fetch('/api/reception').then(res => res.json());

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

const loadDoctors = async () => {
  listDoctors.innerHTML = '';
  let doctorsData = await fetch('/api/doctors').then(res => res.json());

  doctorsData
    .sort((a, b) => {
      if (a.slotMax - a.patients.length <= 0) return 1;
      if (b.slotMax - b.patients.length <= 0) return -1;
      return a.slotMax - a.patients.length > b.slotMax - b.patients.length
        ? 1
        : -1;
    })
    .map((doctor) => {
    let div = document.createElement('div');
    div.className = 'col border d-flex flex-column justify-content-center align-items-center reception-doctor';
    let name = document.createElement('p');
    name.textContent = `Doctor ${doctor.name}`;
    let slot = document.createElement('p');
    slot.textContent = `Slot : ${doctor.patients.length} / ${doctor.slotMax}`;
    
    div.appendChild(name);
    div.appendChild(slot);
    if(parseInt( doctor.slotMax ) === doctor.patients.length) {
      let badgeFull = document.createElement('span');
      badgeFull.className = 'badge bg-danger';
      badgeFull.textContent = 'FULL';
      div.appendChild(badgeFull);
    }

    listDoctors.appendChild(div);
  })
}

const nextPatientToDoctor = async (e) => {
  e.preventDefault();

  let { notifies } = await fetch('/api/reception/next').then(res => res.json());

  socket.emit('reception/reload', {notifies});
} 
