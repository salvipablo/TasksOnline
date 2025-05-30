const CntMain = document.getElementById('cntMain')

const createNewCntColors1 = () => {
  const divColors = document.createElement('div')

  divColors.classList.add('colors')

  divColors.appendChild(createDivColor('#0c0f0b', '#ffffff', true, false))
  divColors.appendChild(createDivColor('#9a9fad', '#000000', false, false))
  divColors.appendChild(createDivColor('#719663', '#000000', false, false))
  divColors.appendChild(createDivColor('#2f382c', '#ffffff', false, false))
  divColors.appendChild(createDivColor('#1f2430', '#ffffff', false, true))

  CntMain.appendChild(divColors)
}

const createNewCntColors2 = () => {
  const divColors = document.createElement('div')

  divColors.classList.add('colors', 'mt-1')

  divColors.appendChild(createDivColor('#e63946', '#000000', true, false))
  divColors.appendChild(createDivColor('#f1faee', '#000000', false, false))
  divColors.appendChild(createDivColor('#a8dadc', '#000000', false, false))
  divColors.appendChild(createDivColor('#457b9d', '#ffffff', false, false))
  divColors.appendChild(createDivColor('#1d3557', '#ffffff', false, true))

  CntMain.appendChild(divColors)
}

const createDivColor = (backColor, textColor, isItTheFirstDiv, isItTheLastDiv) => {
  const miDiv = document.createElement('div')
  const miP = document.createElement('p')

  miDiv.classList.add('cntColor', 'internalText')

  if (isItTheFirstDiv) miDiv.classList.add('firstDiv')
  if (isItTheLastDiv) miDiv.classList.add('lastDiv')

  miDiv.style.backgroundColor = backColor
  miDiv.style.color = textColor

  miP.textContent = backColor
  miDiv.appendChild(miP)

  return miDiv
}

createNewCntColors1()
createNewCntColors2()