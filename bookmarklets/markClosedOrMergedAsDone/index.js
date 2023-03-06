(function() {
  const notificationTypesByClassName = [
    'octicon-git-merge', // merged pull requests
    'octicon-git-pull-request-closed', // closed pull requests
  ];

  notificationTypesByClassName.forEach(notificationClassName => {
    Array.from(document.getElementsByClassName(notificationClassName)).forEach(
      elem => {
        const notificationElem = elem.closest('.notifications-list-item');
        notificationElem.querySelector('input').click();
      }
    );
  });

  document.querySelector('.notifications-list [title="Done"]').click();
})();