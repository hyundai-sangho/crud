$('#add_user').submit(function (event) {
  alert('데이터가 성공적으로 삽입되었습니다')
})

$('#update_user').submit(function (event) {
  event.preventDefault()

  var unindexed_array = $(this).serializeArray()
  var data = {}

  $.map(unindexed_array, function (n, i) {
    data[n['name']] = n['value']
  })

  var request = {
    url: `http://localhost:3000/api/users/${data.id}`,
    method: 'PUT',
    data: data,
  }

  $.ajax(request).done(function (response) {
    alert('데이터 업로드 성공')
  })
})

if (window.location.pathname == '/') {
  $ondelete = $('.table tbody td a.delete')
  $ondelete.click(function () {
    var id = $(this).attr('data-id')

    var request = {
      url: `http://localhost:3000/api/users/${id}`,
      method: 'DELETE',
    }

    if (confirm('이 레코드를 정말로 삭제하고 싶습니까?')) {
      $.ajax(request).done(function (response) {
        alert('데이터 삭제 성공')
        location.reload()
      })
    }
  })
}
