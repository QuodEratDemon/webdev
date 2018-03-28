//how to play state
var howtoState = {

	preload: function(){
		game.load.image('how', 'assets/img/howtoplay.png');

		//load assets
		game.load.atlas('atlas', 'assets/img/spritesheet.png','assets/img/sprites.json');
		game.load.image('BG', 'assets/img/BG.png');
		game.load.image('BG2', 'assets/img/BG2.png');
		game.load.image('ground', 'assets/img/platform.png');
		game.load.script('fire', 'js/Fire.js');
		game.load.image('star', 'assets/img/star.png');
		game.load.image('hitbox', 'assets/img/hitbox.png');
		game.load.image('rock', 'assets/img/Stone.png');
		game.load.image('stump', 'assets/img/stump.png');
		game.load.image('crate','assets/img/Crate.png');
		game.load.image('floor','assets/img/floor.png');
		game.load.image('spike','assets/img/spike.png');
		game.load.image('greyscale','assets/img/greyscale.png');

		game.load.audio('noise', ['assets/audio/noises.ogg']);
		game.load.audio('bgm', ['assets/audio/Rainbows.ogg']);
	},

	create: function(){
		//title screen
		game.add.sprite(0,0,'how');

		//set space to start key

		var startKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		//begin the game when space is hit
		startKey.onDown.addOnce(this.begin, this);
	},

	begin: function(){
		game.state.start('main');
	}
};