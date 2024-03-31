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


// tab part
const tablist = document.querySelector('[role="tablist"]');
const tabs = tablist.querySelectorAll('[role="tab"]');

tablist.addEventListener('keydown', changeTabFocus);
tabs.forEach(tab => tab.addEventListener('click', changeTabPanel));
// note: enter and space also firing click event

let tabFocus = 0;
function changeTabFocus(e) {
  const keyLeft = 'ArrowLeft';
  const keyRight = 'ArrowRight';

  if (e.key === keyRight || e.key === keyLeft) {
    tabs[tabFocus].setAttribute('tabindex', -1);

    if (e.key === keyRight) {
      tabFocus++;
      if (tabFocus >= tabs.length) tabFocus = 0;

    } else if (e.key === keyLeft) {
      tabFocus--;
      if (tabFocus < 0) tabFocus = tabs.length - 1;
    }

    tabs[tabFocus].setAttribute('tabindex', 0);
    tabs[tabFocus].focus();
  }
}

function changeTabPanel(e) {

  const targetTab = e.target;
  const targetPanelId = targetTab.getAttribute('aria-controls');
  const targetImageId = targetTab.getAttribute('data-tab-image');
  const tabContainer = targetTab.parentNode;
  const mainContainer = tabContainer.parentNode;

  // change the panel
  hideContent(mainContainer, `[role="tabpanel"]`);
  showContent(mainContainer, `#${targetPanelId}`);

  // change the image
  hideContent(mainContainer, '.js-tab-image');
  showContent(mainContainer, `#${targetImageId}`);

  // change the active state
  tabContainer.querySelector('[aria-selected="true"]').setAttribute('aria-selected', false);
  targetTab.setAttribute('aria-selected', true);
}

function hideContent(parent, querySelector) {
  parent
    .querySelectorAll(querySelector)
    .forEach(panel => panel.setAttribute('hidden', true));
}

function showContent(parent, querySelector) {
  parent.querySelector(querySelector).removeAttribute('hidden');
}