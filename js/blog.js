$(document).ready(function() {

    $('#select-topic').on('change', function() {
        var target = $(this).val();
        var label = $('#select-topic option:selected').text().toLowerCase();
        $('.topics [id^="topic-"]').css('display', 'none');
        $('#'+target).css('display', 'block');
        $('.module-browse .trail a').text('View all stories in ' + label + ' →');
        $('.module-browse .trail a').attr('href', '/blog/' + label);
    });

});