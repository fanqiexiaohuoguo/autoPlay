let $buttons=$('#buttons>button')
let $slides=$('#images')
let $images=$('#images>img')
let current=0

makeFakeSlides()

$slides.css({transform:'translate(-400px)'})

bindEvents()

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