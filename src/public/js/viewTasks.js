const EditButtons = document.querySelectorAll('.btnEdit')
const DeleteButtons = document.querySelectorAll('.btnDelete')

EditButtons.forEach(btnEdit => {
  btnEdit.addEventListener('click', function(event) {
    const imageName = event.target.getAttribute('name');
    alert(`El id a editar es: ${imageName}`)
  })
})

DeleteButtons.forEach(btnDelete => {
  btnDelete.addEventListener('click', function(event) {
    const imageName = event.target.getAttribute('name');
    alert(`El id a eliminar es: ${imageName}`)
  })
})
