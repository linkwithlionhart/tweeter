/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  
  // Add event listener and prevent default behavior.
  $(".new-tweet form").submit(function(event) {
    event.preventDefault();
    
    // Serialize form data.
    const serializedData = $(this).serialize();

    // Use jQuery to make AJAX post request.
    $.post('/tweets/', serializedData, function(response) {
      console.log(response);
    });
  }); 

  // TEMPORARY: hard coded test data:
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

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

  renderTweets(data);

});

