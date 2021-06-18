var ResultBox = function(x,y,s){
	this.x = x; 
	this.y = y;
	this.s = s;
	
	this.draw = function(){
		push();
		translate(this.x, this.y);
		fill(255);
		rect(0,0,s,s);
		rect(0,s,s,s/2);
		fill(0);
		text("Check",5,s*11/8);
		text("Drop a coin into the box below", -s/2, -30);
		text("to check if it's a fake one",-s/2, -18)
		text("Be careful! You can only check once.", -s/2, -6);
		pop();
	}
	
	this.isInCheckedRegion = function(x,y){
		return (x>this.x && x<this.x + this.s) && (y>this.y && y< this.y + this.s);
	}
	
	this.onClicked = function(mx, my, coins, sc){
		let cnt = 0;
		let id = -1;
		
		if ((mx > this.x && mx < this.x + this.s) && 
			(my > this.y + this.s && my < this.y + this.s*1.5)) {
			for(let i =0; i< coins.length; i++){
				if (this.isInCheckedRegion(coins[i].x, coins[i].y)) {
					cnt ++;
					id = i;
				}
			}
		
			if(cnt == 1){
				if (coins[id].w != coins[0].w && 
				coins[id].w != coins[coins.length] &&
				coins[id].w != coins[coins.length >> 1]) {
					alert("Correct!!! You're genius!");
				} else {
					alert("Incorrect. You've failed.");
					sc.t = 0;
				}
			} else if (cnt > 1 ) {
				alert("Can only check 1 coin at a time.");
			} else {
				alert("Drop a coin to the above box to check");
			}		
			
		}
	}
}