import confetti from 'canvas-confetti';

export const runFireworks = () => {
  const duration = 1400;
  const animationEnd = Date.now() + duration;
  // useWorker: false keeps canvas-confetti inside the page context so the
  // strict CSP in next.config.js does not block its blob worker.
  const defaults = {
    startVelocity: 24,
    spread: 70,
    ticks: 120,
    gravity: 0.9,
    scalar: 0.8,
    zIndex: 0,
    useWorker: false,
    colors: ['#c8261c', '#141414', '#e4e1da'],
  };

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      clearInterval(interval);
      return;
    }

    const particleCount = 18 * (timeLeft / duration);
    confetti({ ...defaults, particleCount, origin: { x: 0.18, y: 0.7 } });
    confetti({ ...defaults, particleCount, origin: { x: 0.82, y: 0.7 } });
  }, 220);
};