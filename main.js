song=""
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
left_score = 0;
status = "";

function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log('PoseNet Has Been Initialized.');
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " leftWristY = "+ leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristXY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + " rightWristY = "+ rightWristY);
    }
    results[0].pose.keypoints[9].score;
}

function draw(){
    image(video, 0, 0, 600, 500);

       

    fill("red");
    stroke("red");

    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX, rightWristY, 20);

        if(rightWristY > 0 && rightWristY <= 100)
        {
            document.getElementById("speed").innerHTML = "speed = 0.5x";
            song.rate(0.5);
        }
        else if(rightWristX >100 && rightWristY <= 200)
        {
            document.getElementById("speed").innerHTML = "speed = 1x";
            song.rate(1);
        }
        else if(rightWristX >200 && rightWristY <= 300)
        {
            document.getElementById("speed").innerHTML = "speed = 1.5x";
            song.rate(1.5);
        }
        else if(rightWristX >300 && rightWristY <= 400)
        {
            document.getElementById("speed").innerHTML = "speed = 2x";
            song.rate(2);
        }
        else if(rightWristX >400)
        {
            document.getElementById("speed").innerHTML = "speed = 2.5x";
            song.rate(2.5);
        }
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}