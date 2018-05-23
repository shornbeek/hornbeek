
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
setInterval("",500);


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






  $(function() {
  $('.js-nav a, .js-connect').click(function(e) {
    e.preventDefault();
    $('body, html').animate({
      scrollTop: $($.attr(this, 'href')).offset().top
    }, 750);
  });
});



// ——————————————————————————————————————————————————
// TextScramble
// ——————————————————————————————————————————————————

class TextScramble {
  constructor(el) {
    this.el = el
    this.chars = '!<>-_\\/+*^?#__'
    this.update = this.update.bind(this)
  }
  setText(newText) {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise((resolve) => this.resolve = resolve)
    this.queue = []
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ''
      const to = newText[i] || ''
      const start = Math.floor(Math.random() * 40)
      const end = start + Math.floor(Math.random() * 40)
      this.queue.push({ from, to, start, end })
    }
    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
  }
  update() {
    let output = ''
    let complete = 0
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i]
      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar()
          this.queue[i].char = char
        }
        output += `<span class="dud">${char}</span>`
      } else {
        output += from
      }
    }
    this.el.innerHTML = output
    if (complete === this.queue.length) {
      this.resolve()
    } else {
      this.frameRequest = requestAnimationFrame(this.update)
      this.frame++
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }
}

// ——————————————————————————————————————————————————
// Example
// ——————————————————————————————————————————————————

const phrases = [
  'Hello,',
  'My Name is. . .',
  'Stephen Hornbeek',
  'I\'m a Creative Leader',
  'Software Developer',
  'Industrial Designer',
  'and. . . So Much More!',
  'I built this site',
  'Designed the products',
  'Architected the UX/UI',
  'Refine Refine Refine. . .',
  'Hit product deadlines',
  'Software rollout strategies',
  'Big launch events',
  'Solving different problems',
  'That makes life. . .',
  'Better for everyone',
  'Prepare for tomorrow by...',
  'Contacting me today',
  'Stephen_Hornbeek@yahoo.com',
  'Bye',

]

const el = document.querySelector('.text')
const fx = new TextScramble(el)

let counter = 0
const next = () => {
  fx.setText(phrases[counter]).then(() => {
    setTimeout(next, 1200)
  })
  counter = (counter + 1) % phrases.length
}

next()

