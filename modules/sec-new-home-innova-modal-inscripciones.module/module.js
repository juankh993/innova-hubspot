const closeModalHome = document.querySelectorAll('.close-modal-home');
const modalHome = document.querySelector('.modal-home');
document.body.classList.add('overflow-hidden');
closeModalHome.forEach((modal) => {
  modal.addEventListener('click', () => {
    modalHome.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  });
});