$(".makeSureBtn").click(function(){
    var inputs = $("input[class='am-fl'");
    if(inputs[1].value != inputs[2].value){
        alert("密码不一致");
        return;
    }
    if(inputs[1].value.trim() == ""){
        alert("密码不可为空");
        return;
    }
    cordova.exec(success, fail, "httpRequest", "CHANGEPASSWORD", [inputs[0].value, inputs[1].value]);
});

function success(msg){
    alert(msg);
}
function fail(msg){
    alert(msg);
}