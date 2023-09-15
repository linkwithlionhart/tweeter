/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  
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
      <content>${tweet.content.text}</content>
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
      $tweetsContainer.append($tweet);
    }
  }

  // Fetch tweets from the server and render to page.
  const loadTweets = () => {
    $.ajax('/tweets', { method: 'GET'})
    .then(function(tweets) {
      renderTweets(tweets);
    })
  }

  // Handle the form submission.
  $(".new-tweet form").submit(function(event) {
    event.preventDefault();
    
    const tweetLength = $('#tweet-input').val().length;

    // Validate tweet length before submission.
    if (tweetLength === 0) {
      alert("Tweet content must not be empty. Type something.")
      return; 
    }

    if (tweetLength > 140) {
      alert("Tweet content exceeds the 140 character limit!");
      return;
    }

    // Serialize form data.
    const serializedData = $(this).serialize();

    // Use jQuery to make AJAX post request.
    $.post('/tweets/', serializedData, function(response) {
      console.log(response);
      loadTweets(); 
    });
  }); 

});

