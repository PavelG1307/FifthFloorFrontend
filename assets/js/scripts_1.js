function longClickHandler(e){
    e.preventDefault();
    $("body").append("<p>You longclicked. Nice!</p>");
  }
  
  $("p a").longclick(250, longClickHandler); 