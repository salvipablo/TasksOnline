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

window.addEventListener('load', () => {
  const widthBody = document.body.clientWidth
  const h2Elements = document.querySelectorAll('.taskTitle')

  if (widthBody < 768) {
    h2Elements.forEach(function(element) {
      const textoOriginal = element.textContent
      const textoAcortado = textoOriginal.length > 20 ? textoOriginal.substring(0, 20) + '...' : textoOriginal
      element.textContent = textoAcortado
    })
  }
})