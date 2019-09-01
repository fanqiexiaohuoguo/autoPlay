var allButtons=$('#buttons>button')
for(let i=0;i<allButtons.length;i++){
  $(allButtons[i]).on('click',function(event){
    var index=$(event.currentTarget).index()
    var p=index*(-600)
    $('#images').css({
      transform:'translate('+p+'px)'
    })
    n=index
    activeButton(allButtons.eq(n))
  })
}

var n=0
var size=allButtons.length
playSlide(n%size)
activeButton(allButtons.eq(n%size))
var timeId=setTimer()
$('.window').on('mouseenter',function(){
  window.clearInterval(timeId)
})
$('.window').on('mouseleave',function(){
  timeId=setTimer()
})

function activeButton($button){
  $button.addClass('red').siblings('.red').removeClass('red')
}
function playSlide(index){
  allButtons.eq(index).trigger('click')
}
function setTimer(){
  return setInterval(()=>{
    n+=1
    playSlide(n%size)
  },3000)
}