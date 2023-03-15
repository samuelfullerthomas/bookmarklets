(function() {
  const notificationTypesByClassName = [
    '.octicon-git-merge', // merged pull requests
    '.octicon-git-pull-request-closed', // closed pull requests
  ];

  notificationTypesByClassName.forEach(notificationClassName => {
    Array.from(document.querySelectorAll(notificationClassName)).forEach(
      elem => {
        const notificationElem = elem.closest('.notifications-list-item');
        if (notificationElem) {
          notificationElem.querySelector('input').click();
        }
      }
    );
  });
})();
