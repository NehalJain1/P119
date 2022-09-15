timer_count = 0;
timer_check = "";
Sketch_drawn = "";
Answerholder = "";
score = "";
array_1=["pen","tooth","tree","apple","banana","bag","cake","drum","chair","donut","shirt","spectacles","flower","smiley","bird","clock","eye","tent","wheel","ice-cream","binoculars","telephone","foot","hand","television","panda","octopus","campfire"];
random_no = Math.floor((Math.random()*array_1.length)+1);
Element_of_array = array_1[random_no];
console.log(Element_of_array);
document.getElementById("Sketch2draw").innerHTML = "Sketch to be drawn: " + Element_of_array;

function preload() {
   classifier = ml5.imageClassifier('DoodleNet');
}
function setup() {
   canvas = createCanvas(400,400);
   canvas.center();
   background("white");
   canvas.mouseReleased(classifyCanvas);
}
function draw() {
checksketch();
if(Sketch_drawn == Element_of_array) {
    Answerholder = "set";
score = score + 1;
document.getElementById("Score").innerHTML = score;
console.log(score);
}
strokeWeight(13);
stroke(0);
if(mouseIsPressed) {
   line(pmouseX , pmouseY , mouseX , mouseY);
}
}

function classifyCanvas() {
   classifier.classify(canvas , gotResult);
}

function updateCanvas() {
    background("white");
}
function checksketch() {
 timer_count = timer_count + 1;
 document.getElementById("Timer").innerHTML = "Timer:" + timer_count;
 console.log(timer_count);
 if(timer_count>500) {
    timer_count = 0;
    timer_check = "completed";
    Element_of_array = array_1[random_no];  
 }
 if(timer_check == "completed" || Answerholder == "set") {
    timer_check = "";
    Answerholder = "";
    updateCanvas();
    }
 }

 function gotResult(error,results) {
   if(error) {
       console.error(error);
   }
   else {
       console.log(results);
      Sketch_drawn = results[0].label;
      document.getElementById("Drawn_sketch").innerHTML = "Drawn Sketch :" + Sketch_drawn;
       document.getElementById("confidence").innerHTML = "Confidence : " + Math.round(results[0].confidence * 100) + "%";
   }
   }
