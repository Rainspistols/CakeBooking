'use strict';

(function() {
  function disableForm() {
    window.card.FIELDSETS.forEach((item) => (item.disabled = true));
  }
  disableForm()
})();
