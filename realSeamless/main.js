let $buttons=$('#buttons>button')
let $slides=$('#images')
let $images=$('#images>img')
let current=0

makeFakeSlides()

$slides.css({transform:'translate(-400px)'})

bindEvents()

let $previous=$('#previous')
let $next=$('#next')
$previous.on('click',()=>{
    gotoSlide(current-1)
})
$next.on('click',()=>{
    gotoSlide(current+1)
})

let timer=setTimer()

document.addEventListener('visibilitychange',()=>{
    if(document.hidden){
        clearInterval(timer)
    }
    else{
        timer=setTimer()
    }
})

$('#wrapper').on('mouseover',function(){
    clearInterval(timer)
})
$('#wrapper').on('mouseout',function(){
    timer=setTimer()
})

function bindEvents(){
    $('#buttons').on('click','button',function(e){
        let $button=$(e.currentTarget)
        let index=$button.index()
        gotoSlide(index)
    })
}

function makeFakeSlides(){
    let $firstCopy=$images.eq(0).clone(true)
    let $lastCopy=$images.eq($images.length-1).clone(true)
    $slides.append($firstCopy)
    $slides.prepend($lastCopy)
}

function gotoSlide(index){

    if (index>$images.length-1){
        index=0
    }else if(index<0){
        index=$images.length-1
    }
    if(current===$buttons.length-1&&index===0){
        //最后一张到第一张
        $slides.css({transform:'translate('+(-($buttons.length+1)*400)+'px)'})
        .one('transitionend',function(){
            $slides.hide().offset()
            $slides.css({transform:'translate('+(-(index+1)*400)+'px)'}).show()
        })
    }else if(current===0&&index===$buttons.length-1){
        //第一张到最后一张
        $slides.css({transform:'translate(0px)'})
        .one('transitionend',function(){
            $slides.hide().offset()
            $slides.css({transform:'translate('+(-(index+1)*400)+'px)'}).show()
        })
    }else{
        $slides.css({transform:'translate('+(-(index+1)*400)+'px)'})
    }
    current=index
}

function setTimer(){
    return setInterval(function(){
        gotoSlide(current+1)
    },2000)
}