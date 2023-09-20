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

  // Check if the user has scrolled and show/hide button.
  $(window).scroll(function() {
    if ($(this).scrollTop() > 200) {
      $('#scrollToTop').fadeIn();
      $('nav').fadeOut();
    } else {
      $('#scrollToTop').fadeOut();
      $('nav').fadeIn();
    }
  });

  // Scroll to top and show textarea when button is clicked.
  $('#scrollToTop').click(function() {
    $('html, body').animate({ scrollTop: 0 }, 'slow', function() {
      $('.new-tweet').slideDown();
      $('#tweet-input').focus(); // Enable the textarea
    });
    return false;
  });

});