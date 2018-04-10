
var blob;

var blobs = [];
var zoom = 1;


function setup() {
  background(0);
  createCanvas(700, 300);
  blob = new Blob(0, 0, 64);
  for (var i = 0; i < 200; i++) {
    var x = random(-width,width);
    var y = random(-height,height);
    blobs[i] = new Blob(x, y, 16);
  }
}

function draw() {


  translate(width/2, height/2);
  var newzoom = 64 / blob.r;
  zoom = lerp(zoom, newzoom, 0.1);
  scale(zoom);
  translate(-blob.pos.x, -blob.pos.y);

  for (var i = blobs.length-1; i >=0; i--) {
    blobs[i].show();
    if (blob.eats(blobs[i])) {
      blobs.splice(i, 1);
    


    }
  }

  


  blob.show();
  blob.update();

}

function blink(p)
{
if (p.style.visibility == "visible" )
{
p.style.visibility = "hidden";
}
else
{
p.style.visibility = "visible";
}
}
setInterval("blink(bl)",500);


var sentences = new Array ('Hello bro penhead !','Hi ?','Welcome to my new pen ...', 'Dude I know you.', 'Unlimited sentences', 'Just put the text in the JS array', 'Fart Fart Fart ...', '... Thanks for paying but you are out.','Try again ');

var timer = 5000;

$(document).ready(function(){

    var total = sentences.length - 1;

    for (var i = 0; i <= total; i++) {

        $('#box').append('<p class="sl" id="textBox'+i+'"></p>');
         
        var max = sentences[i].length - 1;

        for (var j = 0; j <= max; j++) {
            $('#textBox'+i).append('<span style="transition: ' + Math.random()*3 + 's; transition-delay: ' + Math.random() + 's;">' + sentences[i].charAt(j) + '</span>'); 
        };

    }; 

    var maxBox = $('#box > p').length;
    var r = 0;

    $('#textBox' + r).addClass('active');

    setInterval(function(){ 

        $('#textBox' + r).removeClass('active');

        r++;

        if (r == maxBox) {
            r = 0;
        }
   
        setTimeout(function(){ 
            $('#textBox' + r).addClass('active');
        }, 2000);

    }, timer);

}); 