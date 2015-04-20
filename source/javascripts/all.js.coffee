$ ->
  $('.committee li').click ->
    member_name = $(this).attr('class')
    console.log member_name 
    $('.member_info').hide()
    $(".member_info."+member_name).show()

  left_nav_offset = $('.left-nav').offset().top - 100
  $(window).scroll ->
    if ($('body').scrollTop() > left_nav_offset) and ($('body').scrollTop() < 4800)
      $('.left-nav').css({ "position": "fixed", "top": "100px" })
    else if $('body').scrollTop() > 4800
      $('.left-nav').css({ "position": "absolute", "top": "4900px"})
    else 
      $('.left-nav').css({ "position": "absolute", "top": "1800px" })
