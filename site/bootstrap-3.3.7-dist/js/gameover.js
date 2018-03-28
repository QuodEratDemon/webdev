//gameover state
var overState = {

	preload: function(){
		var score;
		game.load.image('over', 'assets/img/gameover.png');
	},

	create: function(){
		

		game.add.sprite(0,0,'over');

		//display final score

		var finalscore = game.add.text(510,game.world.height-312, score,{font:'50px Arial', fill: '#ffffff'});
		finalscore.stroke = '#000000';
		finalscore.strokeThickness = 5;

		if (score<15){
			var finalscoreoff = game.add.text(420,game.world.height-222, 'The real fun begins at 15',{font:'16px Arial', fill: '#ffffff'});
			finalscoreoff.stroke = '#000000';
			finalscoreoff.strokeThickness = 3;
		}

		var startKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		//restart the game when space is hit
		startKey.onDown.addOnce(this.begin, this);
	},

	begin: function(){
		game.state.start('main');
	}
};

