var _URI = "http://api.forismatic.com/api/1.0/";
var params = '?method=getQuote&lang=en&format=jsonp&jsonp=?';
$("#button").on('click', function() {
    $.getJSON(_URI + params, function(res) {
        $("#quote").text(res.quoteText);
        $("#quote-author").text(res.quoteAuthor);
    });
});