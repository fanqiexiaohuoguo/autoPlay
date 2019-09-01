var n=1
initState()
setInterval(()=>{
    var length=$('.images>img').length
    n=adjustNumber(n,length)
    var curSelector='.images>img:nth-child('+n+')'
    $(curSelector).removeClass('current').addClass('leave')
    .one('transitionend',(event)=>{
        $(event.currentTarget).removeClass('leave').addClass('enter')
    })
    var next=adjustNumber(n+1,length)
    var nextSelector='.images>img:nth-child('+next+')'
    $(nextSelector).removeClass('enter').addClass('current')
    n+=1
},1000)
function adjustNumber(number,length){
    if(number>length){
        number=number%length
        if(number===0){
            number=length
        }
    }
    return number
}
function initState(){
    $('.images>img:nth-child(1)').addClass('current')
    .siblings().addClass('enter') 
}