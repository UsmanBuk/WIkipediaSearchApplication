function ajaxCall() {
    $.ajax({
        url: 'https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=' + encodeURIComponent($('#search').val()),
        type: 'GET',
        dataType: 'jsonp',
        success: function(data) {
            $('#update').empty();
            
            var output = '';

            data.query.search.forEach(function(result) { 
                var title = "<h2>" + result.title + "</h2><br>";
                var snippet = "<p>" + result.snippet + "</p><br>";
                var url = '<a href="https://en.wikipedia.org/wiki/' + encodeURIComponent(result.title) + '" target="_blank">';
                var endUrl = '</a>';
                output += url + title + endUrl + snippet + '<hr>';
            });

            $('#update').append(output);
        },
        error: function(xhr, status, error) {
            console.error("AJAX Error: " + status + ": " + error);
            $('#update').html("<p>An error occurred. Please try again later.</p>");
        }
    });
}

function randomfunction(){
    $('#update').empty();
    $('#search').val('');
    $('iframe').attr('src', 'https://en.wikipedia.org/wiki/Special:Random');
}

$(document).ready(function() {
    $('#search').focus();
    $('#search').off('keyup');
    $('#search').on('keyup', function() {
        ajaxCall();
        $('iframe').attr('src', '');
    });

    // Show random article
    $('.random').on('click', function() {
        randomfunction();
        $(this).text('Show me another random article');
    });
});
