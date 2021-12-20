// hover over card to display card details

let cardImageEl = document.querySelectorAll('.card-image');
let cardBodyEl = document.querySelectorAll('.card-body');

// add event listener to each card
cardImageEl.forEach(function (c) {
    c.addEventListener('mouseenter', function (e) {
        // display the card body of event
        $(e.target).siblings(".card-body").fadeIn();
    });
})
cardBodyEl.forEach(function (c) {
    c.addEventListener('mouseleave', function (e) {
        // display the card body of event
        $(e.target).fadeOut();
    });
})
