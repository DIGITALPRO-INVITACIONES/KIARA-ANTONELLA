const cover = document.getElementById('cover');
const invitation = document.getElementById('invitation');
const openButton = document.getElementById('open');
const music = document.getElementById('music');
const musicButton = document.getElementById('music-toggle');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

function updateMusicButton() {
  const playing = !music.paused;
  musicButton.textContent = playing ? '♫ Pausar' : '♫ Música';
  musicButton.setAttribute('aria-label', playing ? 'Pausar música' : 'Reproducir música');
  musicButton.setAttribute('aria-pressed', String(playing));
}

music.addEventListener('playing', updateMusicButton);
music.addEventListener('pause', updateMusicButton);
updateMusicButton();

openButton.addEventListener('click', () => {
  openButton.disabled = true;
  cover.classList.add('opening');
  music.volume = 0.65;
  music.play().catch(updateMusicButton);
  setTimeout(() => {
    cover.hidden = true;
    invitation.hidden = false;
    musicButton.hidden = false;
    window.scrollTo({ top: 0, behavior: 'instant' });
    invitation.querySelector('.name').focus({ preventScroll: true });
  }, reducedMotion.matches ? 0 : 580);
}, { once: true });

musicButton.addEventListener('click', () => {
  if (music.paused) {
    music.play().catch(updateMusicButton);
  } else {
    music.pause();
  }
});
