$(document).ready(function(){

    //const urlDev = "http://localhost:3000"
    const urlDev = "http://localhost:3031/api/v1/"
    const token = JSON.parse(localStorage.getItem('x-token'));
    if(token !== null){
        window.location.href = `./dashbord.html`
    }
    else{
        $("#formLogin").on('click',(e)=>{
            e.preventDefault();
        });
    
        $("#btnLogin").on("click", ()=>{
    
            loading ();
            const userName = $("#userPhone").val();
            const password = $("#password").val();

            if(userName == "" || password == ""){
                closed("Veuillez verifier les champs","bg-red-700")

                setTimeout(()=>{
                    window.location.reload()
                },2000)
            }
    
            const data = {
                "phone":userName,
                "password":password
            }
            $.ajax({
                url: "http://localhost:3031/api/v1/user/login",
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: function(res) {
                    const {message,token} = res
                    console.log(token)
                    if(message === "Connexion successful"){
                        closed(message,"bg-green-400")
                        localStorage.setItem('x-token',JSON.stringify(token))
                        // setTimeout(()=>{
                        //     window.location.href = `${urlDev}/dash`
                        // },3000)
                    }
                    else{
                        closed(message,"bg-red-700")
                        setTimeout(()=>{
                            window.location.reload()
                        },3000)
                    }
                },
                error: function(xhr, status, error) {
                    console.log('Error:', error);
                    closed("Erreur de connexion","bg-red-700")
                    alert('Error: ' + error);
                }
            });
    
        })
    }
   


});

function loading (){
    $('#textBtn').addClass("hidden")
    $(".load").removeClass('hidden')
}

function closed(message, color){
    $('#textBtn').removeClass("hidden");
    $(".load").addClass('hidden')
    $('#textBtn').text(message)
    $("#btnLogin").removeClass("bg-blue-400")
    $("#btnLogin").addClass(color)
}