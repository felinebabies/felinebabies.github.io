today = "";
$(document).ready(function(){
  // URLパラメータを解析する
  var paramArr = [];
  params = location.href.split("?");
  if(params.length > 1){
    splitParams = params[1].split("&");

    for(var i = 0 ; i < splitParams.length; i++){
      var vol = splitParams[i].split("=");
      paramArr.push(vol[0]);
      paramArr[vol[0]] = vol[1];
    }
  }

  if(paramArr["year"] == null || paramArr["month"] == null || paramArr["day"] == null) {
    today = new Date();
  }
  else {
    today = new Date(paramArr["year"], paramArr["month"], paramArr["day"]);
  }

  // ピート君の現年齢を計算し、分岐する
  var birthday = new Date(2082,1,1);
  var pete_age = today.getFullYear() - birthday.getFullYear();

  if(pete_age < 0){
    // ピート君未出生
  } else if(pete_age < 18) {
    // ピート君出生済
    $(".maincontents").hide();
    $(".annopetronius").show();
  } else {
    // ピート君が18歳以上
    $(".maincontents").hide();
    $(".age18").show();
  }

  // 日付文字列
  $(".today_number").each(function(){
    $(this).text("西暦" + today.getFullYear() + "年" + (today.getMonth() + 1) + "月" + today.getDate() + "日");
  });

  // ピート君の現年齢
  $(".peteagenow").each(function(){
    $(this).text(pete_age);
  });
});
