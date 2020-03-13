(function() {
  class AutoClicker {
    constructor(messageSelector, targetContent, repeatClicks = false) {
      this.messageSelector = messageSelector;
      this.clickedIndexes = {};
      this.targetContent = targetContent;
      this.repeatClicks = repeatClicks;
    }
    startClicking() {
      window.setInterval(() => {
        const elements = window.document.querySelectorAll(this.messageSelector);
        if (elements.length > 0) {
          const buttons = Array.from(elements);
          buttons.forEach((button, index) => {
            if (
              button.textContent == this.targetContent &&
              (!this.clickedIndexes[index] || this.repeatClicks)
            ) {
              this.clickedIndexes[index] = true;
              button.click();
            }
          });
        }
      }, 2000);
    }
  }
  var threePointer = new AutoClicker('button:nth-child(3) > span', '3', true);
  threePointer.startClicking();
})();
