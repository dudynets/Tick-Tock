import { registerSW } from "virtual:pwa-register";

import tickFavicon from '/favicons/tick.png';
import tockFavicon from '/favicons/tock.png';
import tickSound from '/audio/tick.mp3';
import tockSound from '/audio/tock.mp3';
import muteIcon from '/icons/mute.svg';
import unmuteIcon from '/icons/unmute.svg';

const NUMBER_OF_ITEMS = 16;
const INTERVAL_MS = 1000;

const favicon: HTMLLinkElement = document.querySelector("link[rel~='icon']")!;

const clockWheelEl: HTMLDivElement = document.querySelector('.clock__wheel')!;
const clockWheelItems: NodeListOf<HTMLDivElement> =
  document.querySelectorAll('.clock__wheel-item')!;

const soundEffectsButton: HTMLButtonElement = document.querySelector('.sound-effects-button')!;
const soundEffectsButtonIcon: HTMLImageElement = document.querySelector(
  '.sound-effects-button__icon',
)!;
const soundEffectsButtonText: HTMLSpanElement = document.querySelector(
  '.sound-effects-button__text',
)!;

let soundEffectsEnabled = false;

function startAnimation() {
  document.title = `Tick`;
  favicon.href = tickFavicon;
  let activeItemIndex = 1;

  setInterval(() => {
    const isTock = activeItemIndex % 2 === 1;

    if (soundEffectsEnabled) {
      const audio = new Audio(isTock ? tockSound : tickSound);
      audio.play();
    }

    document.title = `T${isTock ? 'o' : 'i'}ck`;
    favicon.href = isTock ? tockFavicon : tickFavicon;

    clockWheelEl.setAttribute('style', `--active-index: ${activeItemIndex}`);
    clockWheelItems[activeItemIndex % NUMBER_OF_ITEMS].classList.add('clock__wheel-item--active');
    clockWheelItems[
      (activeItemIndex % NUMBER_OF_ITEMS) - 1 < 0
        ? NUMBER_OF_ITEMS - 1
        : (activeItemIndex % NUMBER_OF_ITEMS) - 1
    ].classList.remove('clock__wheel-item--active');

    activeItemIndex = activeItemIndex + 1;
  }, INTERVAL_MS);
}

function toggleSoundEffects() {
  soundEffectsEnabled = !soundEffectsEnabled;
  soundEffectsButtonIcon.setAttribute('src', soundEffectsEnabled ? unmuteIcon : muteIcon);
  soundEffectsButton.setAttribute(
    'title',
    `${soundEffectsEnabled ? 'Disable' : 'Enable'} sound effects`,
  );
  soundEffectsButtonIcon.setAttribute('alt', `${soundEffectsEnabled ? 'Unmute' : 'Mute'} icon`);
  soundEffectsButtonText.innerText = soundEffectsEnabled ? 'Sound enabled' : 'Sound disabled';
}

soundEffectsButton.addEventListener('click', toggleSoundEffects);
document.addEventListener('keydown', (event) => {
  if (event.key === 'm') toggleSoundEffects();
});

startAnimation();

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("New version is available. Update?")) updateSW(true);
  },
});