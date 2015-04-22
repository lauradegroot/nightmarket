$ ->
  $('.committee-section li').click ->
    member_name = $(this).attr('class')
    console.log member_name 
    $('.member_info').hide()
    $(".member_info."+member_name).show()

  left_nav_offset = $('.left-nav').offset().top - 100
  committee_offset = $('.committee-section').offset().top - 100

  $(window).scroll ->
    if ($(window).scrollTop() > left_nav_offset) and ($(window).scrollTop() < committee_offset)
      $('.left-nav').css({ "position": "fixed", "top": "100px" })
    else if $(window).scrollTop() > committee_offset
      $('.left-nav').css({ "position": "absolute", "top": (committee_offset + 100)+"px"})
    else 
      $('.left-nav').css({ "position": "absolute", "top": "1800px" })
    
    if $('body').scrollTop() > 50
      $('.top-nav').addClass('white-nav')
    else
      $('.top-nav').removeClass('white-nav')

  continuousElements = document.getElementsByClassName('lineup_category')
  i = 0
  while i < continuousElements.length
    new Waypoint(
      element: continuousElements[i]
      handler: ->
        menu_item = $(this)[0].element.id
        $(".left-nav li").removeClass("active")
        $("li."+menu_item).addClass("active")
      continuous: false
      offset: 100)
    i++
