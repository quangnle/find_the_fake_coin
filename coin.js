var Coin = function(id,x,y,r,w){
	this.id = id;
	this.w = w;
	this.x = x;
	this.y = y;
	this.r = r;
	this.isSelected = false;
	
	this.draw = function(){
		fill("#ff0");
		ellipse(this.x,this.y,this.r,this.r);
	}
	
	this.onClicked = function(mx, my){
		let d = (this.x - mx)*(this.x - mx) + (this.y - my)*(this.y - my);
		if (d < this.r * this.r){
			this.isSelected = true;			
		}
		else 
			this.isSelected = false;
	}
	
	this.onDragged = function(mx,my){
		if (this.isSelected){
			this.x = mx;
			this.y = my;
		}
	}
	
	this.onMouseReleased = function(){
		this.isSelected = false;
	}
}