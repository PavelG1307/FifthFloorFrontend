function long_press(event, url) {
    event = event || window.event;
    event.cancelBubble = true;
    goTo(url);
    return false;
  }