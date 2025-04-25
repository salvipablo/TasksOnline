const getFormattedDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Mes comienza desde 0
  const day = String(now.getDate()).padStart(2, '0');

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}/${month}/${day} - ${hours}:${minutes}:${seconds}`;
}

export const ShowLog = (message, typeMessage) => {
  if (typeMessage === 1) console.info(`${getFormattedDateTime()} : ${message}`)
  if (typeMessage === 2) console.error(`${getFormattedDateTime()} : ${message}`)
}