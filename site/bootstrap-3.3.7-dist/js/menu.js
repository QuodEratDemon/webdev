//menu for the game

var menuState = {

	preload: function(){
		game.load.image('menuscreen', 'assets/img/menuscreen.png');
		//game.load.audio('bgm', ['assets/audio/Rainbows.ogg']);
	},

	create: function(){
		//title screen
		game.add.sprite(0,0,'menuscreen');

		/*
		//music
		bgm = game.add.audio('bgm');
		bgm.loop = true;
		bgm.play();
		*/


		//var title = game.add.text(80,80,'Cataclysm',{font:'50px Arial', fill: '#ffffff'});
		//var instructions = game.add.text(80,game.world.height - 80, 'press SPACE to start!',{font:'50px Arial', fill: '#ffffff'});
	

		//set space to start key

		var startKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		//begin the game when space is hit
		startKey.onDown.addOnce(this.begin, this);
	},

	begin: function(){
		game.state.start('howtoplay');
	}
};