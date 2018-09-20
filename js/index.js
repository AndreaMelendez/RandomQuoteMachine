$(document).ready(function() {
  var quote,
    author;

  function getNewQuote() {
    $.ajax({
      url: 'https://api.forismatic.com/api/1.0/',
      jsonp: 'jsonp',
      dataType: 'jsonp',
      data: {
        method: 'getQuote',
        lang: 'en',
        format: 'jsonp'
      },
      success: function(res) {
        console.log(res);
        quote = res.quoteText;
        author = res.quoteAuthor;

        $('#text').text(quote);

        if (author) {
          $('#author').text(author);
        } else {
          $('#author').text('Unknown');
        }

      }
    });

  }

  getNewQuote();

  $('#new-quote').on('click', function(event) {
    event.preventDefault();
    getNewQuote();
  })

  $('#tweet-quote').on('click', function(event) {
    event.preventDefault();

    if (quote.length > 100) {
      quote = quote.substr(0, 100).match(/(.+)\s/)[1] + "...";
    }

    quote = "\"" + quote + '"';

    window.open("https://twitter.com/intent/tweet?text=" + quote + " &hashtags=inspiration");
  })
});