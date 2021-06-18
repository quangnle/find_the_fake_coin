var ScaleBox = function(x,y,r){
	this.x = x;
	this.y = y;
	this.r = r;
	this.clr = "#aaf";
	
	this.draw = function(){
		push();
		translate(this.x, this.y);
		
		fill(this.clr);
		ellipse(0, 0, this.r, this.r);
		
		pop();
	}
};

var Scale = function(x,y,w,t){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = w/2;
	this.t = t;
	this.left = new ScaleBox(w/5, 0, w/2);
	this.right = new ScaleBox(w*4/5, 0, w/2);
	this.state = 0;
	
	this.draw = function(){
		push();
		translate(this.x, this.y);
		
		if (this.state == 0){
			this.left.clr = "#aaf";
			this.right.clr = "#aaf";
		} else if (this.state > 0) {
			this.left.clr = "#faa";
			this.right.clr = "#afa";
		} else {
			this.left.clr = "#afa";
			this.right.clr = "#faa";
		}
		
		this.left.draw();
		this.right.draw();
		
		// foundation
		fill(255);
		rect(this.w/5, this.h*0.5, this.w*3/5, this.h*0.1);
		
		let c = {"x":this.w/2, "y":this.h*0.6};
		let l = {"x":this.w/2 - this.w*0.05, "y":this.h*0.7};
		let r = {"x":this.w/2 + this.w*0.05, "y":this.h*0.7};
		line(c.x,c.y,l.x,l.y);
		line(c.x,c.y,r.x,r.y);
		line(r.x,r.y,l.x,l.y);
		
		rect(this.w*0.4, this.h * 0.8, this.w*0.2, this.h * 0.2)
		fill(0);
		text(" Weight", this.w * 0.4, this.h * 0.95);
		
		// instruction
		
		text("Available times:" + this.t, this.w * 0.1, this.h + 20);
		text("RED: Heavier; GREEN: Lighter; BLUE: Equal", this.w * 0.1, this.h + 40);
		
		pop();
	}
	
	this.onWeighting = function(mx,my,coins){
		if (mx > (this.x + this.w * 0.4) && mx < (this.x + this.w * 0.6) && 
			my > (this.y + this.h * 0.8) && my < (this.y + this.h)) {
			if (this.t > 0) {
				this.weighting(coins);		
				this.t --;
			}	
		}
	}
	
	this.weighting = function(coins){		
		let lw = 0;
		let rw = 0;
		
		for(let i =0; i < coins.length; i++){
			let pl = {"x": this.left.x + this.x, "y": this.left.y + this.y};
			let pr = {"x": this.right.x + this.x, "y": this.right.y + this.y};
			let dl = (coins[i].x - pl.x)*(coins[i].x - pl.x) + (coins[i].y - pl.y)*(coins[i].y - pl.y);			
			let dr = (coins[i].x - pr.x)*(coins[i].x - pr.x) + (coins[i].y - pr.y)*(coins[i].y - pr.y);
			
			if (dl < this.left.r*this.left.r/4) {
				lw += coins[i].w;
			} else if (dr < this.right.r*this.right.r/4) {
				rw += coins[i].w;
			}
		}
		
		this.state = lw - rw;
	}		
}

