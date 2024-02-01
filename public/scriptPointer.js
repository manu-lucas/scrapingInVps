const imgElement = document.querySelector('.imgf29');

let isDragging = false;
let startX, startY, offsetX, offsetY;

imgElement.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX - imgElement.getBoundingClientRect().left;
  startY = e.clientY - imgElement.getBoundingClientRect().top;

  imgElement.classList.add('draggable');
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;

  offsetX = e.clientX - startX;
  offsetY = e.clientY - startY;

  imgElement.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
});

document.addEventListener('mouseup', () => {
  if (isDragging) {
    imgElement.classList.remove('draggable');
    isDragging = false;
  }
});
