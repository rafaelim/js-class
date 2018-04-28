const WIKIPEDIA_API_URI = "https://en.wikipedia.org/w/api.php";

$(() => {
    $("#search-form").on('submit', (evt) => {
        evt.preventDefault();
        searchForTermOnWikipedia();
    });
});

function searchForTermOnWikipedia(term = $("#search").val()) {
    const action = 'action=opensearch';
    const search = `search=${term}`;
    const format = 'json';
  
    const params = `?${action}&${search}&${format}&callback=?`;
    const uri = WIKIPEDIA_API_URI + params;
    $.getJSON(uri, (data) => {
        $("#content").html('');
        mountResultOnScreen(data)
    });
}

function mountResultOnScreen(data) {
    const titles = data[1];
    const links = data[3];
    const size = titles.length;
    for(let index = 0; index < size; index++) {
      var element = "<a href='" +  links[index] +"' target='_blank'>" + titles[index] + "</a><br />"; 
      $('#content').append(element);
    }
}