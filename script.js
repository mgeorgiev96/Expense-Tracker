

let balance = document.querySelector(".balance"),
    expense = document.querySelector(".expense"),
    amount = document.querySelector(".amount"),
    name = document.querySelector(".name"),
    cost = document.querySelector(".cost"),
    list = document.querySelector(".list"),
    button = document.querySelector("button"),
    plus = document.querySelector(".fa-plus-circle"),
    remain= document.querySelector(".remain"),
    sync = document.querySelector(".fa-sync"),
    box = document.querySelector(".box"),
    moment = require("moment"),
    date = new Date(),
    time = document.querySelector(".time"),
    dateUP = moment(date).format("LL")


setInterval(()=>{
  time.innerHTML = dateUP  
},1000)

if(!window.localStorage.items){
    balance.innerHTML = `0$`
}else{
    balance.innerHTML = `${window.localStorage.items}$`
}

if(!window.localStorage.expense){
    expense.innerHTML = `0$`
}else{
    expense.innerHTML = `${window.localStorage.expense}$`
}

if(!window.localStorage.balance){
    remain.innerHTML = `0$`
}else{
    remain.innerHTML = `${window.localStorage.balance}`
}

if(!window.localStorage.list){
    window.localStorage.list = ""
    list.innerHTML = window.localStorage.list
}else{
    list.innerHTML += `${window.localStorage.list}`
}





const setBalance = ()=>{
    let reg = /[0-9.]/g
    let l = amount.value.match(reg)
    
    
    if(!l || l.length < amount.value.length){
        alert("Please Enter a valid amount")
    }else{
        window.localStorage.items = amount.value
        balance.innerHTML = `${window.localStorage.items}$`
        window.localStorage.balance = (+(balance.innerHTML.match(reg).join(""))) - (+(expense.innerHTML.match(reg).join(""))) + "$"
        remain.innerHTML = window.localStorage.balance
            balance.classList.add("flash")
            remain.classList.add("flash")
        setTimeout(()=>{
            balance.classList.remove("flash")
            remain.classList.remove("flash")
        },500)
    }
    amount.value = ""
}

const expenseAdd = ()=>{
    let reg = /[0-9.]/g
    let l = cost.value.match(reg)
    
    
    if(balance.innerHTML === '0$'){
        alert("Budget is 0$")
    }else{
        if(!l || l.length < cost.value.length){
        alert("Please Enter a valid expense amount")
    }else{
        
        if(remain.innerHTML.includes("-")){
        window.localStorage.balance = +`-${(window.localStorage.balance.match(reg).join(""))}`- (+cost.value)
        remain.innerHTML = `${window.localStorage.balance}$` 
        }else{
        window.localStorage.balance = +(window.localStorage.balance.match(reg).join("")) - (+cost.value)
        remain.innerHTML = `${window.localStorage.balance}$`  
        }

       window.localStorage.expense =  
           -(+expense.innerHTML.match(reg).join("")) + (-(+cost.value))
        expense.innerHTML = `${window.localStorage.expense}$`
        
        
        
        window.localStorage.list += `<li>${name.value} - ${cost.value}$</li>`
        list.innerHTML = window.localStorage.list
        
        box.classList.add("active")
        box.innerHTML = `-${cost.value}$`
        setTimeout(()=>{
            box.classList.remove("active")
        },1000)
        
        remain.classList.add("flash")
        expense.classList.add("flash")
        setTimeout(()=>{
            remain.classList.remove("flash")
            expense.classList.remove("flash")
        },500)
    }
    cost.value = ""
    name.value = ""
    }
}

const clear = ()=>{
    window.localStorage.clear()
    remain.innerHTML = "0$"
    balance.innerHTML = "0$"
    expense.innerHTML = "0$"
    list.innerHTML = ""
    window.localStorage.list = ""
}

sync.addEventListener("click",clear)
button.addEventListener("click",setBalance)
plus.addEventListener("click",expenseAdd)
    