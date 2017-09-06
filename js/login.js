
$("#login").click(function(e){
	e.preventDefault();
	var user_name=$('[name="username"]').val();
	var user_password=$('[name="password"]').val();
	$.ajax({
		type:"POST",
		data:{username:user_name,password:user_password},
		url:"data/login.php",
		success:function(data){

			if(data.code<0){
				$(".warning").text("您输入的用户名或密码不匹配")
			}else {
				sessionStorage['LoginName']=user_name;
				sessionStorage['loginPsw']=user_password;
				sessionStorage['loginUid']=data.uid;
				//console.log(data.uid);
				//debugger;
				console.log("user_name"+user_name);

				location.href = "index.html";
				//user_name;


				//console.log(sessionStorage['LoginName']);
				//debugger;
			}
		},
		error:function(){
			alert('响应消息有问题');
		}
	});
})
$("#reg").click(function(e){
	e.preventDefault();
	location.href="reg.html"
})
