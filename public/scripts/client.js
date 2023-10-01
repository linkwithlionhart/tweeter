/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  
  // Toggle the new-tweet section when the nav div is clicked.
  $('nav div').click(function() {
    $('.new-tweet').slideToggle();
    $('#tweet-input').focus(); // Automatically focuses on the textarea after sliding down.
  });

  /**
   * Escapes potentially harmful characters in a string to prevent Cross-Site Scripting (XSS) attacks.
   * @param {string} str - The input string potentially containing harmful characters.
   * @returns {string} - A new string with harmful characters converted into their safe, encoded representation.
   */ 
  const escape = str => {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  /**
   * Creates a tweet element for provided tweet data.
   * @param {Array} tweets - Array of tweet objects for rendering. 
   * @returns {Object} $tweet - jQuery object of the created tweet element.  
   */
  const createTweetElement = tweet => {
    const $tweet = $('<article>').addClass('tweet');
    
    const tweetHTML = `
      <header class="header-tweet">
        <img src="${tweet.user.avatars}">
        <h3>${tweet.user.name}</h3>
        <h4>${tweet.user.handle}</h4>
      </header>
      <content>${escape(tweet.content.text)}</content>
      <footer class="footer-tweet">
        <div class="tweet-when">${timeago.format(tweet.created_at)}</div>
        <div class="icons">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-sharp fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    `;

    $tweet.html(tweetHTML);
    
    return $tweet;
  }

  /**
   * Renders array of tweet data into tweet-list container.
   * @param {Array} tweets - Array of tweet objects for rendering. 
   */
  const renderTweets = tweets => {
    const $tweetsContainer = $('.tweet-list');

    $tweetsContainer.empty();

    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweetsContainer.prepend($tweet);
    }
  }

  // Fetch tweets from the server and render to page.
  const loadTweets = () => {
    $.ajax('/tweets', { 
      method: 'GET',
      dataType: 'JSON',
    })
    .done(function(tweets) {
      renderTweets(tweets);
    })
    .fail(function(error) {
      console.error("Error fetching tweets:", error.statusText);
      $('#error-text').text("There was an error fetching tweets. Please refresh the page or try again later.");
      $('#error-message').slideDown();
    });
  };

  // Handle the form submission.
  $(".new-tweet form").submit(function(event) {
    event.preventDefault();
    
    const tweetLength = $('#tweet-input').val().length;

    // Hide existing error message.
    $('#error-message').slideUp();

    // Validate tweet length before submission.
    if (!tweetLength) {
      $('#error-text').text("Tweet content must not be empty. Type something, bruh.");
      $('#error-message').slideDown();
      return; 
    }

    if (tweetLength > 140) {
      $('#error-text').text("Tweet content exceeds the 140 character limit!");
      $('#error-message').slideDown();
      return;
    }

    // Serialize form data.
    const serializedData = $(this).serialize();

    // Use jQuery to make AJAX post request.
    $.post('/tweets/', serializedData)
    .done(function(response) {
      console.log(response);
      loadTweets();
    })
    .fail(function(error) {
      console.error("Error posting tweet:", error.statusText);
      $('#error-text').text("There was an error posting your tweet. Please try again later.");
      $('#error-message').slideDown();
    });

    // Reset the text area and character counter after a successful tweet post.
    $('#tweet-input').val('');
    $('.counter').val(140);   
    $('.counter').removeClass('turn-red-counter');
    });
  }); 

  // Fetch and display initial tweets immediately after the page is loaded.
  loadTweets();

});

