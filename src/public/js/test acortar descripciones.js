let affair = 'Limpieza de taller y oficinas, computadoras y vehic'
let widthBody = 520
let shortenedText = affair

if (widthBody < 460 && affair.length > 30) shortenedText = affair.substring(0, 27) + '...'

if ((widthBody > 460 && widthBody < 768) && affair.length > 50) shortenedText = affair.substring(0, 47) + '...'

if (widthBody > 768 && affair.length > 70) shortenedText = affair.substring(0, 67) + '...'