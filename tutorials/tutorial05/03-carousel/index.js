let currentPosition = 0; //start at 0, kinda like iterating an array ofc
let gap = 10; //space between pics
const slideWidth = 400; //...i feel like this is pretty self explanatory

function moveCarousel(direction) {
  const items = document.querySelectorAll(".carousel-item"); //alright here we grab everything with the carousel-item class

  if (direction == "forward") {
    //click the forward button
    // minus 2 b/c first 2 slides already showing //<--sarah comment
    if (currentPosition >= items.length - 2) {
      //and if it's already showing the last two images we can't keep going
      return false; //so we return NO! false!!
    }
    currentPosition++; //but if we're not at the end we increment our position to move forward
  } else {
    //if we're not going forwared (ergo, we are going backward)
    //okay I don't think i need to comment EVERY line

    if (currentPosition == 0) {
      return false; //there's no more going back to be done
    }
    currentPosition--; //and otherwise we decrement and go back
  }

  const offset = (slideWidth + gap) * currentPosition;
  //this is just the distance that our background image div is going to move so that it looks right to the user

  for (const item of items) {
    //...
    item.style.transform = `translateX(-${offset}px)`; //and here we move each item in items (our list of imgs in the carousel div)
  }
}
