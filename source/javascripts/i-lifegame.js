var boardwidth = 30;
var boardheight = 30;

//ページ初期化
function init(canvas_id){
  var table = document.createElement("table");
  table.id = "lifegame_board";
  table.border = "0";

  for(var y = 0 ; y < boardheight ; y++){
    var row = document.createElement("tr");

    for(var x = 0 ; x < boardwidth ; x++){
      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.name = "cell_" + x.toString() + "_" + y.toString();
      checkbox.id = "cell_" + x.toString() + "_" + y.toString();
      var label = document.createElement("label");
      label.htmlFor = "cell_" + x.toString() + "_" + y.toString();

      var cell = document.createElement("td");
      cell.appendChild(checkbox);
      cell.appendChild(label);
      row.appendChild(cell);
    }

    table.appendChild(row);
  }

  var gameform = document.createElement("form");
  gameform.name = "gameform";
  gameform.action = "#";
  gameform.appendChild(table);

  gameform.appendChild(document.createElement("br"));
  var nextbutton = document.createElement("input");
  nextbutton.id = "execbutton";
  nextbutton.type = "button";
  nextbutton.value = "がんばれ♥";
  nextbutton.onclick = setboardgeneration();
  gameform.appendChild(nextbutton);
  gameform.appendChild(document.createElement("br"));
  gameform.appendChild(document.createElement("br"));

  //定期実行間隔テキストボックス
  var intervaltextbox = document.createElement("input");
  intervaltextbox.id = "intervalbox";
  intervaltextbox.type = "text";
  intervaltextbox.value = "1";
  gameform.appendChild(intervaltextbox);
  gameform.appendChild(document.createTextNode("秒ごとに世代を進める"));
  gameform.appendChild(document.createElement("br"));
  gameform.appendChild(document.createElement("br"));

  //定期実行チェックボックス
  var repeatcheckbox = document.createElement("input");
  repeatcheckbox.id = "repeatbox";
  repeatcheckbox.type = "checkbox";
  gameform.appendChild(repeatcheckbox);
  gameform.appendChild(document.createTextNode("定期的に世代を進める"));

  var objbody;
  if(typeof canvas_id === 'undefined'){
    objbody = document.getElementsByTagName("body").item(0);
  }
  else {
    objbody = document.getElementById(canvas_id);
  }
  objbody.appendChild(gameform);

  // 定期実行チェックの切り替え
  var intervalevent;
  $("#repeatbox").on("change", function(){
    if ($(this).prop('checked')) {
      var interval = $("#intervalbox").val();
      intervalevent = setInterval(function(){
        boardgeneration();
      }, interval * 1000);
    } else {
      clearInterval(intervalevent);
    }
  });
}

//次世代でのセルの生存状態を取得する
function checkcellalive(pos_x, pos_y){
  var alives = 0;

  for(var y = -1 ; y <= 1 ; y++){
    for(var x = -1 ; x <= 1 ; x++){
      if((x == 0) && (y == 0)){
        continue;
      }

      //生存を確認するセルの座標を作る
      var obj_x = pos_x + x;
      var obj_y = pos_y + y;

      if(obj_x < 0){
        obj_x = boardwidth + obj_x;
      }
      if(obj_x >= boardwidth){
        obj_x = obj_x - boardwidth;
      }
      if(obj_y < 0){
        obj_y = boardwidth + obj_y;
      }
      if(obj_y >= boardwidth){
        obj_y = obj_y - boardheight;
      }

      //セル名を作る
      var cellname = "cell_" + obj_x.toString() + "_" + obj_y.toString();

      //セルの生存状態を確認する
      var objcell = document.getElementsByName(cellname).item(0);
      if(objcell.checked){
        alives += 1;
      }
    }
  }

  //セル名を作る
  var cellname = "cell_" + pos_x.toString() + "_" + pos_y.toString();

  //現世代の生存状態を取得する
  var objcell = document.getElementsByName(cellname).item(0);

  var currentalive = objcell.checked;

  //次世代の生存状態を返す
  if(currentalive){
    if((alives >= 2) && (alives <= 3)){
      return true;
    }
    else {
      return false;
    }
  }
  else {
    if(alives == 3){
      return true;
    }
    else {
      return false;
    }
  }
}

//盤面を一世代進める
function boardgeneration(){
  //次世代の配列を用意する
  var nextboard = new Array(boardwidth);
  for(x = 0 ; x < boardwidth ; x++){
    nextboard[x] = new Array(boardheight);
  }

  //次世代の生存状態をチェックする
  for(var y = 0 ; y < boardheight ; y++){
    for(var x = 0 ; x < boardwidth ; x++){
      nextboard[x][y] = checkcellalive(x, y);
    }
  }

  //盤面を次世代の状態に入れ替える
  for(var y = 0 ; y < boardheight ; y++){
    for(var x = 0 ; x < boardwidth ; x++){
      //セル名を作る
      var cellname = "cell_" + x.toString() + "_" + y.toString();

      //セルを取得する
      var objcell = document.getElementsByName(cellname).item(0);

      objcell.checked = nextboard[x][y];
    }
  }
}

//boardgenerationを返す
function setboardgeneration(){
  return function() { boardgeneration(); };
}
