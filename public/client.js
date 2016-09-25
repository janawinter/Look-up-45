$(document).ready(function(){

  $('.add-to-collection').click(function(){
    var release = $(this).closest('tr')
    var title = release.find('.title').text()
    var year = release.find('.year').text()
    var catno = release.find('.catno').text()
    var price = release.find('.price').text()
    var releaseId = release.find('.release-id').text()
    $.ajax({
      type: 'POST',
      url: '/add',
      dataType: 'json',
      data: {
        artist:title,
        year:year,
        catno:catno,
        price:price,
        releaseId:releaseId
      },
      success: function (data) {
        //  show message div
        $('.message').show()
        //  add title to message
        $('.message strong').text(title)
      },
      error: function () {
        console.log('Failed to add')
      },
      cache: false
    })
    return false
  })
})
