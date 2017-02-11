
    var now = new Date();//+180000
    var remainingTime = (1467881002008-now.getTime() ) / 1000;
    function showLeftTime() {
        if (remainingTime <= 0) remainingTime = 0;
        m = Math.floor(remainingTime / 60);
        s = Math.floor(remainingTime % 60);
        // add a zero in the front if numbers<10
        m = checkTime(m);
        s = checkTime(s);
        $("#time").text(m + "分" + s + "秒");
        remainingTime--;
    }
    function checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    $(function () {
        setInterval("showLeftTime()", 1000);   
        //  调用弹窗和关闭弹窗
        $("#refuseBtn").click(function () { //拒绝
            $(".voiceMessage").show();
        });
        $("#refuseCancel").click(function () { //拒绝-取消
            $(".voiceMessage").hide();
        });

        $("#refuseConfirm").click(function () { //拒绝-确定
            $("#token").val($("#refuseBtn").attr("checkedV"));
            $("#isBuy").val("0");
            $("#inputForm").submit();
        });
        $("#errorConfirm").click(function () { //确定
		 $("#error").hide();
        });

        $("#agreeBtn").click(function () { //同意
            $("#token").val($("#agreeBtn").attr("checkedV"));
            $("#isBuy").val("1");
            $("#inputForm").submit();
        });
        /*  $(".submit").click(function () {
              $("#token").val($(this).attr("checkedV"));
              alert($(this).attr("checkedV"));
              $("#inputForm").submit();
          });*/
        /*  $("#agreeBtn,#refuseConfirm").click(function () { //ajax
              $.ajax({
                  async: true,
                  cache: false,
                  url: "/assets/confirmed",
                  data: {token: pid: pid},
                  type: "POST",
                  dataType: "json",
                  success: function (arr) {
                      // 3. 得到cid，删除它的内容
                      $("#cid").empty();//删除元素的子元素
                      $("#cid").append($("<option>====请选择2级分类====</option>"));//4.添加头
                      // 5. 循环遍历数组，把每个对象转换成<option>添加到cid中
                      for (var i = 0; i < arr.length; i++) {
                          var option = $("<option>").val(arr[i].cid).text(arr[i].cname);
                          $("#cid").append(option);
                      }
                  }
              });
          });*/

    });