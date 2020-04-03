 function cellphone(p) {
      var regExp = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})[-][0-9]{3,4}[-][0-9]{4}$/;
      return regExp.test(p);
    }

    function order() {
      let name = $('#order_name').val();
      let type = $('#order_type').val();
      let count = $('#order_count').val();
      let address = $('#order_address').val();
      let number = $('#order_number').val();

      if (name == '') {
        alert('이름을 입력해주세요.')
        $('#order_name').focus()
        return;
      } else if (type == 'Choose...') {
        alert('종류를 입력해주세요.')
        $('#order_type').focus()
        return;
      } else if (count == 'Choose...') {
        alert('수량을 입력해주세요.')
        $('#order_count').focus()
        return;
      } else if (address == '') {
        alert('주소를 입력해주세요.')
        $('#order_address').focus()
        return;
      }
      else if (number == '') {
        alert('전화번호를 입력해주세요.')
        $('#order_number').focus()
        return;
      } else if (!cellphone(number)) {
        alert('휴대폰번호 입력 형식이 틀립니다. \n 010-0000-0000으로 입력해주세요.')
        $('#order_number').focus()
        return;
      }

            $.ajax({
                type: "POST",
                url: "/buying",
                data: { name_give: name, type_give: type, count_give: count, address_give: address, number_give: number},
                success: function (response) {
                    if (response['result'] == 'success') {
                        alert(response['msg']);
                         $('#order_name').val('');
                         $('#order_type').val('Choose...');
                         $('#order_count').val('Choose...');
                         $('#order_address').val('');
                         $('#order_number').val('');

                        window.location.reload();
                    }
                }
            })
       }


        $(document).ready(function () {
            $('#orders-box').html('');
            listing();
        });

        function listing() {
            $.ajax({
                type: "GET",
                url: "/buying",
                data: {},
                success: function (response) {
                    if (response['result'] == 'success') {
                        let buying = response['buying'];
                        for (let i = 0; i < buying.length; i++) {
                            make_card(buying[i]['name'], buying[i]['type'], buying[i]['count'], buying[i]['address'], buying[i]['number']);
                        }
                    } else {
                        alert('주문을 받아오지 못했습니다');
                    }
                }
            })
        }

        function make_card(name, type, count, address, number) {
            let temp_html = '<tr>\
                                <td>'+ name + '</td>\
                                <td>'+ type + '</td>\
                                <td>'+ count + '</td>\
                                <td>'+ address + '</td>\
                                <td>'+ number + '</td>\
                            </tr>';
            $('#orders-box').append(temp_html);
        }