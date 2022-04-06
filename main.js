
status_1=""
objects= [];



function setup(){
    
    canvas= createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(380,380);
    objectDetection= ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML= "Status: Detecting Objects";

}

function draw(){
    image(video, 0, 0, 380, 380);
    
  if(status_1 != "")
  {
      r = random(255);
      g = random(255);
      b = random(255);
    for (i = 0; i < objects.length; i++){
        document.getElementById("status").innerHTML = "Status : Objects Detected";
        document.getElementById("number_of_objects").innerHTML = "The number of objects detected is "+ objects.length;
        fill(r,g,b);
        percent= floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
  }
}

function modelLoaded(){
    console.log("Model is Loaded");
    status_1=true;
    objectDetection.detect(video,gotResults);
}

function gotResults(error,results){
 if(error){
     console.error(error);
 }else{
  console.log(results);
  objects= results;
 }
}