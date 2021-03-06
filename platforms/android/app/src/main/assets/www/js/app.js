/**
 * document.ready不能立马执行cordova.exec   test
 */
document.addEventListener('deviceready', function () {
     myapp();
}, false);

function myapp(){
   cordova.exec(success, fail, "httpRequest", "MYAPPACTION", []);
}

//获取卡信息成功
function success(msg){
   var cardId = msg.cardId;
   var accountState = msg.accountState;
   var accountMoney = msg.accountMoney;
   var userTypeInnerId = msg.userTypeInnerId;

   $("#cardid").text("NO."+cardId);
   $("#amount").text(accountMoney);
   //0，正常，1，冻结 2，无账户信息 3 已过期
   if(accountState === 0){
        $("#cardstatus").text("正常");
   }else if(accountState === 1){
        $("#cardstatus").text("冻结");
   }else if(accountState === 2){
        $("#cardstatus").text("无账户信息");
   }else if(accountState === 3){
        $("#cardstatus").text(" 已过期");
   }else{
        $("#cardstatus").text(accountState);
   }

   if(userTypeInnerId === 2){
        $("#shsq").css("display","block");
         $("#fbxx").css("display","block");
   }
}

function fail(msg){
    if("网络访问错误" === msg ){
        weakdialg(msg);

        return;
    }
	var code = msg.code;
    var msg = msg.msg;
    if(code === '404' || code === '405' || code === '-100'){
       dialg(msg);
       window.location.href="home.html";
    }else{
       dialg(msg);
       window.location.href="app.html";
    }
}


//退出
$(document).ready(function(){

    $("#logoutBtn").click(function(){
         cordova.exec(succeed, failed, "httpRequest", "LOGOUT", []);
    });
});

//登录成功
function succeed(msg){
	window.location.href="home.html";
}

function failed(msg){
	dialg(msg);
}

