(function () {
  
    // Create variable for setTimeout
    var delay;
    
    // Set number of milliseconds for longpress
    var longpress = 300;
    
    var listItems = document.getElementsByClassName('list-item');
    var listItem;
    
    for (var i = 0, j = listItems.length; i < j; i++) {
      listItem = listItems[i];
      
      listItem.addEventListener('touchend', function (e) {
        var _this = this;
        delay = setTimeout(check, longpress);
        
        function check() {
            _this.innerText = 'sdjflksajflkf';
        }
        
      }, true);
      
      listItem.addEventListener('touchstart', function (e) {
        // On mouse up, we know it is no longer a longpress
        clearTimeout(delay);
      });
      
      listItem.addEventListener('touchend', function (e) {
        clearTimeout(delay);
      });
      
    }
    
  }());