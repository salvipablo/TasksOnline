const EditButtons = document.querySelectorAll('.btnEdit')
const DeleteButtons = document.querySelectorAll('.btnDelete')

const DeleteTask = async (idTaskToDelete) => {
  const Request = await fetch(`./${idTaskToDelete}`, {
    method: 'DELETE',
  })

  const Response = await Request.json()

  return Response;
}

EditButtons.forEach(btnEdit => {
  btnEdit.addEventListener('click', function(event) {
    const imageName = event.target.getAttribute('name');
    alert(`El id a editar es: ${imageName}`)
  })
})

DeleteButtons.forEach(btnDelete => {
  btnDelete.addEventListener('click', async function(event) {
    const imageName = event.target.getAttribute('name');

    let opStatus = await DeleteTask(imageName)

    alert(`${opStatus.message}`)

    location.reload(true);
  })
})
