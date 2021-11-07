const doctorRooms = document.querySelectorAll('.doctor-rooms ul')[0];

window.addEventListener('load', () => {

  socket.on('list-doctor-room/reload', () => {
    loadListDoctorRoom();
  });

})

const loadListDoctorRoom = async () => {
  doctorRooms.innerHTML = '';
  const doctors = await fetch('/api/doctor-room').then(res => res.json());
  doctors.map(doctor => {
    let block = document.createElement('a');
    block.href = `/doctor-room/${doctor.id}`;
    let li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between';
    let spanName = document.createElement('span');
    spanName.textContent = `Doctor ${doctor.name}`;
    let spanSlot = document.createElement('span');
    spanSlot.textContent = `Slot : ${doctor.patients.length} / ${doctor.slotMax}`;

    li.appendChild(spanName);
    li.appendChild(spanSlot);

    block.appendChild(li);
    doctorRooms.appendChild(block);
  })
}