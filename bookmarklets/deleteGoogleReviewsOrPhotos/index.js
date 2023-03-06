(async function deleteGoogleReviewsOrPhotos() {
  const REVIEWS_CONTEXT_MENU_SELECTOR = '[aria-label*="Actions"]';
  const PHOTOS_CONTEXT_MENU_SELECTOR = '[aria-label*="actions"]';

  const CONTEXT_MENU_ITEM_SELECTOR = '[role="menuitemradio"]';

  const reviewsOrPhotos = [
    ...document.querySelectorAll(REVIEWS_CONTEXT_MENU_SELECTOR),
    ...document.querySelectorAll(PHOTOS_CONTEXT_MENU_SELECTOR),
  ];

  for (let i = 0; i < reviewsOrPhotos.length; i++) {
    const reviewOrPhoto = reviewsOrPhotos[i];
    console.log(`task: ${i} of ${reviewsOrPhotos.length}`);
    reviewOrPhoto.click();
    await wait(500);
    await deleteContribution();
  }

  async function deleteContribution() {
    [...document.querySelectorAll(CONTEXT_MENU_ITEM_SELECTOR)].forEach(
      menuItemButton => {
        const buttonHTML = menuItemButton.innerHTML.toLowerCase();
        const isDeleteButton = /delete|elimina/i.test(buttonHTML);
        if (isDeleteButton) {
          menuItemButton.click();
        }
      }
    );
    await wait(500);
    await confirmDeleteContribution();
  }

  async function confirmDeleteContribution() {
    [...document.querySelectorAll('button')].forEach(button => {
      const buttonHTML = button.innerHTML.toLowerCase();
      const isConfirmButton = /delete/i.test(buttonHTML);
      if (isConfirmButton) {
        button.click();
      }
    });
    await wait(1000);
  }

  async function wait(timeout = 1000) {
    await new Promise(resolve => setTimeout(resolve, timeout));
  }

  console.log('DONE');
})();
