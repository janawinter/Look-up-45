$(document).ready(function(){

$('.add-to-collection').click(function(){
  var release = $(this).closest('tr')
  var title = release.find('.title').text()
  var catno = release.find('.catno').text()
  var price = release.find('.price').text()
  var releaseId = release.find('.release-id').text()
  $.ajax({
     type: 'POST',
     url: '/add',
     dataType: 'json',
     data: {
       artist:title,
       catno:catno,
       price:price,
       releaseId:releaseId
     },
     error: function () {
      console.log('OH NOOOOO ... POST')
     },
     cache: false
})
  return false
})
})
