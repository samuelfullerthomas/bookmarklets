(function() {
  Array.prototype.forEach.call(
    document.querySelectorAll('.js-comment-delete button'),
    function(element) {
      const closestComment = element.closest('.js-comment-container');
      const isTeamCity = closestComment.querySelector(
        'a.author[href="/svc-teamcity"]'
      );
      if (isTeamCity) {
        element.removeAttribute('data-confirm');
        element.click();
      }
    }
  );
})();
