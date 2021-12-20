// hover over card to display card details

let cardImageEl = document.querySelectorAll('.card-image');
let cardBodyEl = document.querySelectorAll('.card-body');

console.log(cardImageEl)

// add event listener to each card
cardImageEl.addEventListener('mouseenter', function (e) {
        // display the card body of event
        console.log(e.target);
        $(e.target).siblings(".card-body").fadeIn();
});

cardImageEl.addEventListener('mouseleave', function (e) {
        // fade out card body of event
        console.log(e.target);
        $(e.target).siblings(".card-body").fadeOut();
});


