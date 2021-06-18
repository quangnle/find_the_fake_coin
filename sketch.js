
var s = new Scale(80, 200, 240, 3);
var rb = new ResultBox(400, 150, 50);
var coins = [];

function setup(){
	createCanvas(600,500);
	for (let i=0; i< 11; i++){
		let coin = new Coin(i,50+i*30,50,20,10);
		coins.push(coin);
	}
	let fkId = Math.floor(Math.random()*11-0.000001);
	coins[fkId].w += (Math.random()*2 - 1);
}

function sqDist(p1, p2){
	return (p1.x-p2.x)*(p1.x-p2.x)+(p1.y-p2.y)*(p1.y-p2.y);
}

function draw(){
	background(255);
	fill(250);
	rect(1,1,599,499);
	s.draw();
	rb.draw();
	
	for (let i=0; i< 11; i++){
		coins[i].draw();
	}	
	
}	

function mousePressed(){
	for (let i=0; i< 11; i++){
		coins[i].onClicked(mouseX, mouseY);
	}
	
	let sId = 0;
	for (let i=0; i< 11; i++){
		if (sqDist({"x":mouseX, "y":mouseY}, coins[i]) < sqDist({"x":mouseX, "y":mouseY}, coins[sId])){
			sId = i;
		}
	}
	
	for (let i=0; i< 11; i++){
		if (i != sId) coins[i].isSelected = false;
	}
	
	s.onWeighting(mouseX, mouseY, coins);
	rb.onClicked(mouseX, mouseY, coins, s);
}

function mouseDragged() {
	for (let i=0; i< 11; i++){
		coins[i].onDragged(mouseX, mouseY);
	}
}

function mouseReleased(){
	for (let i=0; i< 11; i++){
		coins[i].onMouseReleased();
	}
}