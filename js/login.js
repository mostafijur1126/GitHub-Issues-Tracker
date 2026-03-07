document.getElementById("singUpBtn").addEventListener("click",()=>{
    const username = document.getElementById("username");
    const password = document.getElementById("password");

    if(username.value === "admin" && password.value === "admin123"){
        window.location.assign("home.html");
    }else{
        alert("Invalid Username or Password");
        return;
    }
})
