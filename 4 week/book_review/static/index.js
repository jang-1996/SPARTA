            $(document).ready(function () {
                $('#orders-box').html('');
                listing();
            });

           function make_review() {
    		// 1. 제목, 저자, 리뷰 내용을 가져옵니다.
        let title = $('#title').val();
        let author = $('#author').val();
        let review = $('#review').val();

    		// 2. 제목, 저자, 리뷰 중 하나라도 입력하지 않았을 경우 alert를 띄웁니다.
    		// 지난 주에 배웠던 Input Validation 파트 입니다.
        // Input validation 종류 : 입력 여부, 포맷 확인, 최대 길이 제한 등
        if (title == '') {
            alert('제목을 입력해주세요');
            $('#title').focus();
            return;
        } else if (author == '') {
            alert('저자를 입력해주세요');
            $('#author').focus();
            return;
        } else if (review == '') {
            alert('리뷰를 입력해주세요');
            $('#review').focus();
            return;
        }
    		// 위에 return (함수 종료시키기)을 빼고 아래 코드 전체를 else 안에 넣어도 무방!
        // (하지만 가독성 측면에서는 현재 코드 방식이 나음)
        // is_long 부분도 구현

    		// 3. POST /write 에 저장을 요청합니다.
        // GET과 달리 data 부분에 딕셔너리 형태로 값을 넣어줌!
        $.ajax({
            type: "POST",
            url: "/reviews",
            data: { title_give: title, author_give: author, review_give: review },
            success: function (response) {
            console.log(response)
                if (response['result'] == 'success') {
                    alert(response['msg']);
                    $('#title').val('');
                    $('#author').val('');
                    $('#review').val('');


                    window.location.reload();
                }
            }
        })
    }

            function listing() {
    		// 1. 리뷰 목록을 서버에 요청하기
        $.ajax({
            type: "GET",
            url: "/reviews",
            data: {},
            success: function (response) {
    						// 2. 요청 성공 여부 확인하기
    			console.log(response)
                if (response['result'] == 'success') {
                    let reviews = response['reviews'];
    							  // 3. 요청 성공했을 때 리뷰를 올바르게 화면에 나타내기
                    for (let i = 0; i < reviews.length; i++) {
                        make_card(reviews[i]['title'], reviews[i]['author'], reviews[i]['review']);
                    }
                } else {
                    alert('리뷰를 받아오지 못했습니다');
                }
            }
        })
    }

            function make_card(title, author, review) {
                let temp_html = '<tr>\
                                    <td>'+ title + '</td>\
                                    <td>'+ author + '</td>\
                                    <td>'+ review + '</td>\
                                </tr>';
                $('#orders-box').append(temp_html);
            }

            function is_long(obj) {
                let content = $(obj).val();
                if (content.length > 140) {
                    alert('리뷰는 140자까지 기록할 수 있습니다.');
                    $(obj).val(content.substring(0, content.length - 1));
                }
            }
