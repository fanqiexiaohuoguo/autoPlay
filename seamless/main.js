var n=1
var length=$('.images>img').length
initState()
var timer=setTimer()
document.addEventListener('visibilitychange',function(){
    if(document.hidden){
        window.clearInterval(timer)
    }
    else{
        timer=setTimer()
    }
})

function initState(){
    $('.images>img:nth-child(1)').addClass('current')
    .siblings().addClass('enter') 
}
function makeCurrent($node){
    $node.removeClass('enter leave').addClass('current')
    return $node
}
function makeLeave($node){
    $node.removeClass('current enter').addClass('leave')
    return $node
}
function makeEnter($node){
    $node.removeClass('current leave').addClass('enter')
    return $node
}
function getImage(n){
    n=adjustNumber(n,length)
    var curSelector='.images>img:nth-child('+n+')'
    return $(curSelector)
}
function adjustNumber(number,length){
    if(number>length){
        number=number%length
        if(number===0){
            number=length
        }
    }
    return number
}
function setTimer(){
    return setInterval(()=>{
        makeLeave(getImage(n)).one('transitionend',(event)=>{
            makeEnter($(event.currentTarget))
        })
        makeCurrent(getImage(n+1))
        n+=1
    },1000)
}