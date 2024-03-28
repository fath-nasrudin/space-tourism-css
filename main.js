// primary-header parts
const navToggle = document.querySelector('.js-mobile-nav-toggle');
const primaryNavigation = document.querySelector('.js-primary-navigation');

navToggle.addEventListener('click', (e) => {
  const visibility = primaryNavigation.getAttribute('data-visible');

  if (visibility === "true") {
    primaryNavigation.setAttribute('data-visible', false)
    navToggle.setAttribute('aria-expanded', false)
  } else {
    primaryNavigation.setAttribute('data-visible', true)
    navToggle.setAttribute('aria-expanded', true)
  }
})