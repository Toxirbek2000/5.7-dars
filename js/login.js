let elFrom = document.querySelector(".login-form")
let elBtn = document.querySelector(".login-btn")


elFrom.addEventListener("submit", function(e){
    e.preventDefault()
    const data = {
        username: e.target.username.value,
        password: e.target.password.value
    }
    elBtn.innerHTML = `<img class="scale-[1.5] mx-auto" src="./images/loading.png" alt="Loading..." width="38" height="37">`

    if (data.username == "Toxirbek" && data.password == "123"){
        setTimeout(() => {
            elBtn.innerHTML = "Войти"
            localStorage.setItem("user", JSON.stringify(data))
            location.pathname = "./products.html"
        }, 1000)
    }
    else{
        setTimeout(() => {
            elBtn.innerHTML = `ошибка пароля`
        }, 1000)
        setTimeout(() => {
            elBtn.innerHTML = `Войти`
        }, 2500)
    }
})



