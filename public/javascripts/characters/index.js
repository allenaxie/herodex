// hover over card to display card details
let cardEl = document.querySelectorAll('.card');
let cardImageEl = document.querySelectorAll('.card-image');
let cardBodyEl = document.querySelectorAll('.card-body');

// add event listener to each card
cardImageEl.forEach(function (c) {
    c.addEventListener('mouseenter', function (e) {
        console.log(e)
        // display the card body of event
        $(e.target).siblings(".card-body").fadeIn();
    });
})
cardBodyEl.forEach(function (c) {
    c.addEventListener('mouseleave', function (e) {
        console.log(e)
        // display the card body of event
        $(e.target).fadeOut();
    });
})

let cardArray = [];

cardEl.forEach(function (c) {
    cardArray.push(c);
    // if card is even-numbered index
    if (cardArray.indexOf(c) % 2) {
        // add class column 1
        c.classList.add("col-1")
    } 
    // else if odd-numbered index
    else {
        // add to column 2
        c.classList.add("col-2")
    }
})