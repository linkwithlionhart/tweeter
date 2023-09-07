$(document).ready(function() {
  // Count input characters in text area.
  $('#tweet-input').on('input', function() {
    let remainingChars = 140 - $(this).val().length;
    // Display result.
    let counter = $(this).siblings('.tweet-footer').children('.counter');
    counter.val(remainingChars);
    // Turn counter red when max limit exceeded.
    counter.toggleClass('turn-red-counter', remainingChars < 0)
  })
});