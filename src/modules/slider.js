import Swiper, { Navigation, Autoplay } from 'swiper';
export const slider = () => {
  const swiper = new Swiper('.slider', {
    loop: true,
    modules: [Navigation, Autoplay],

    autoplay: {
      delay: 2500,
      disableOnInteraction: true,
    },
    // Navigation arrows
    navigation: {
      nextEl: '.slider-button-next',
      prevEl: '.slider-button-prev',
    },
  });

  console.log(swiper);
};
