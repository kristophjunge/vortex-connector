(function(){
	
	var canvas=document.getElementById('vortex_canvas'),
		context=canvas.getContext('2d');
	
	//var randomizer='0323b543c1be29ce6f0d1d2aa2408342';
	var randomizer='969b6ccf564374417fb268257aa1ae87';
	//var randomizer='aa582d2980b8e5ea42826006f686f563';
	//var randomizer='c447dee3904f622717264c8960b035bf';
	//var randomizer='4facc4ad36755baac52e32077e500758';
	
	var lastrandomizer=0;
	
	canvas.width=canvas.width;
	
	// Tree anchor position
	context.translate(325,400);
	
	// Scale down
	//context.scale(0.5,0.5);
	
	// Draw the first branch
	drawBranch(-Math.PI/2,5,1);

	
	function drawBranch(angle,maxgeneration,generation) {
		
		context.save();
		
		
		context.lineWidth=2;
		
		context.strokeStyle="rgb(0,255,0)";
		
		// Multicolored stroke style
		/*
		context.strokeStyle="hsl("+generation*10+", 100%,50%)";
		*/
		
		
		context.rotate(angle);
		
		context.beginPath();
		context.moveTo(0,0);
		context.lineTo(60,0);
		context.stroke();
		
		context.translate(60,0);
		
		
		// Make this generation smaller then previous
		/*
		var scale=randSeed(0.75,1);
		context.scale(scale,scale);
		*/
		
		// Create two sub branches for every branch
		if (generation<maxgeneration) {
			
			drawBranch(0.5,maxgeneration,generation+1);
			drawBranch(-0.5,maxgeneration,generation+1);
			
			// Create randomized sub branches
			/*
			drawBranch(randSeed(0,Math.PI/4),maxgeneration,generation+1);
			drawBranch(randSeed(-Math.PI/4,0),maxgeneration,generation+1);
			*/
			
		}
		
		// Draw flowering
		
		/*
		else if (generation==maxgeneration) {
			
			context.fillStyle='#fff';
			context.beginPath();
			context.arc(0,0,10,0,Math.PI*2,true);
			context.fill();
			
		}
		*/
		
		context.restore();
		
		//generation--;
		
	}
	
	function randSeed(min,max) {
		
		var rndNum=randomizer.charCodeAt(lastrandomizer);
		
		if (lastrandomizer==randomizer.length) {
			lastrandomizer=0;
		} else {
			lastrandomizer++;
		}
		
		return (rndNum/100)*(max-min)+min;
		
	}
	
})();