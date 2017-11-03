//= require_tree .

$(window).on('scroll', function() {
  var globalpos = $("header").height();
    $('.globalmenu').toggleClass('fixed', $(this).scrollTop() > globalpos);
});
