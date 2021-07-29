const paintingText = (text, color) => {
  const notification = document.getElementById('notification');
  const notiText = document.createElement('div');
  notiText.innerText = text;
  notiText.style.backgroundColor = color;
  notification.appendChild(notiText);
};
export const handleNewUser = ({nickname}) => {
  paintingText(`${nickname} is joined`, 'teal');
};
export const handleDisconnected = ({nickname}) => {
  paintingText(`${nickname} is left`, 'tomato');
};
