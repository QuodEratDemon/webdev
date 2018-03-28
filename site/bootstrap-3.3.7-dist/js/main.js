//var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var mainState = {

	

	preload: function()  {
		//jump variables
		var jump_time = 0;
		var bonusjumps;
		var jump_count;
		var long_jump = false;
		//score variables
		var score ;
		var scoretext;
		//misc. variables
		var bonustext;
		var debug;
		var sound;
		var obstacleTime;
		var spikeTime;
		var distance;
		var cheat;
		var choices;
		var choices2;
		var choices3;
		var choices4;
		var totalPause;

		

	},

	create: function() {


		//set game world
		game.world.setBounds(0, 0, 2000, 600);

		//background

		background = game.add.tileSprite(0,0,800,600,'BG');
		background2 = game.add.tileSprite(0,0,800,600,'BG2');
		
		hell = game.add.sprite(0,0);
		hell.width = 800;
		hell.height = 600;
		filter = game.add.filter('Fire', 800, 600);
		filter.alpha = 0.7;
		hell.filters = null;

		//floor
		platforms = game.add.group();
		
		//give platform physics 
		platforms.enableBody = true;
		
		//create ground
		var ground = platforms.create(0, game.world.height - 64, 'ground');
		//scale it
		ground.scale.setTo(2,2);
		
		//make the ground immovable
		ground.body.immovable = true;

		//tile floor
		floor = game.add.tileSprite(0,game.world.height - 64,800,600,'floor');

		greyscale = game.add.tileSprite(0,game.world.height - 64,800,600,'greyscale');

		

		//music
		sound = game.add.audio('noise');
		sound.loop = true;
		sound.play();

		bgm = game.add.audio('bgm');
		bgm.loop = true;
		bgm.play();

		//player
		player = game.add.sprite(32, 416, 'atlas');
		player.animations.add('Walk',Phaser.Animation.generateFrameNames('Walk', 1, 10,'', 3), 15, true);
		player.animations.add('Jump',Phaser.Animation.generateFrameNames('Jump', 1, 14, '', 3), 10, false);
		player.animations.add('demon',Phaser.Animation.generateFrameNames('demon', 1, 4, '', 2), 39, true);

		player.scale.setTo(0.25,0.25);
		game.physics.arcade.enable(player);

		//hitbox
		hitbox = game.add.sprite(32, 416, 'hitbox');
		//hitbox.scale.setTo(0.25,0.18);
		hitbox.scale.setTo(0.20,0.15);
		game.physics.arcade.enable(hitbox);
		hitbox.alpha = 0.0;
		
		//player physics
		player.body.bounce.y = 0.1;
		player.body.gravity.y = 1000;
		player.body.collideWorldBounds = true;

		//stars
		this.stars = game.add.group();
		//stars.enableBody = true;

		//rocks
		this.rocks = game.add.group();

		//stumps
		this.stumps =game.add.group();

		//crates
		this.crates = game.add.group();

		//spikes
		this.spikes = game.add.group();

		//input
		jump = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		//score
		scoretext = game.add.text(45,25,'Score: 0', {fontSize: '25px', fill: '#ffffff'});
		scoretext.stroke = '#000000';
		scoretext.strokeThickness = 5;
		score=0;

		//bonus jumps
		bonustext = game.add.text(45,55,'Jumps: 0', {fontSize: '25px', fill: '#ffffff'});
		bonustext.stroke = '#000000';
		bonustext.strokeThickness = 5;

		bonusjumps = 0;
		jump_count = 1;

		//for debug purposes
		//debug = game.add.text(400,16,'height: 0', {fontSize: '32px', fill: '#000'});

		endgame = game.input.keyboard.addKey(Phaser.Keyboard.X);
		var gotoend =  game.add.text(45,85,'Press X to end it!', {fontSize: '25px', fill: '#000000'});

		//this.timer = game.time.events.loop(1500, this.spawnStuff, this); 

		obstacleTime = 0;
		spikeTime = 0;

		//varied distances
		distance = [2000, 2100, 2300];

		//choices in spawn
		choices = [1,2];
		choices2 = [1,2,3,4,5];
		choices3 = [1,2,3];

		//misc
		cheat = 20;
		totalPause = 0;
		
		
	},

	update: function() {
		// run game loop
		var hitPlatform = game.physics.arcade.collide(player,platforms);
		filter.update();

		//endgame change to infinite jumps

		if (score >= 15){
			jump_count = Infinity;
		}
		

		//walk cycle
		if (player.body.touching.down){
			player.animations.play('Walk');

			//reset jumps
			bonusjumps = jump_count;
		}

		//set hitbox
		hitbox.position.x = player.position.x+35;
		hitbox.position.y = player.position.y+15;

		background.tilePosition.x -=2;
		background2.tilePosition.x -=2;
		floor.tilePosition.x -=2;
		bonustext.text = 'Jumps: '+ bonusjumps;
		scoretext.text = 'Score: ' + score;

		//air time variable resets
		hell.filters = null;
		background2.alpha = 0.0;
		greyscale.alpha = 0.0;
		sound.mute = true;
		bgm.mute = false;

		//jump and long jumps
		if (jump.isDown){
			
			if ((player.body.touching.down && jump_time == 0)||(jump_time == 0 && bonusjumps != 0)){
				if (bonusjumps != 0){
					bonusjumps--;
				}
				jump_time =1;
				player.body.velocity.y = -250;
			}else if (jump_time > 0 && jump_time < 31){
				jump_time++;
				player.body.velocity.y = -450 + (jump_time*7);
			}
			
		}else{
			jump_time = 0;
		}

		//change scene
		if (!player.body.touching.down){
			if (score >= 5){
				player.animations.play('demon');
			}else{
				player.animations.play('Jump');
			}
			
			hell.filters = [filter]
			bgm.mute = true;
			background2.alpha = 1.0;
			sound.mute = false;
			greyscale.alpha = 1.0;
			greyscale.tilePosition.x -=2;
		} 



		//collect star
		game.physics.arcade.overlap(hitbox,this.stars,this.collectStar,null,this);

		//kill player
		game.physics.arcade.overlap(hitbox,this.crates,this.killPlayer,null,this);
		game.physics.arcade.overlap(hitbox,this.rocks,this.killPlayer,null,this);
		game.physics.arcade.overlap(hitbox,this.stumps,this.killPlayer,null,this);
		game.physics.arcade.overlap(hitbox,this.spikes,this.killPlayer,null,this);

		//spawn obstacles

		if (game.time.now - game.time.pauseDuration  > obstacleTime) {            
			obstacleTime = game.time.now + game.rnd.pick(distance) - game.time.pauseDuration;

			if (score < 5){
				if (game.rnd.pick(choices) == 1){
					this.obstacle1(); 

					

				}else if (game.rnd.pick(choices) == 2) {
					this.obstacle2();  
					
				} 

			}else if (score < 10){
				if (game.rnd.pick(choices2) == 1){
					this.obstacle4(); 

				}else if (game.rnd.pick(choices2) == 2) {
					this.obstacle1();  
					
				}else if (game.rnd.pick(choices2) == 3){
					this.obstacle3();
					obstacleTime += 2000; 

				} else if (game.rnd.pick(choices2) == 4){
					this.obstacle4();
					obstacleTime += 2000; 
				}else if (game.rnd.pick(choices2) == 5){
					this.obstacle3();
					obstacleTime += 2000; 
				}

			}else if (score < 15){
				if (game.rnd.pick(choices3) == 1){
					this.obstacle5(); 
					obstacleTime += 2000; 

				}else if (game.rnd.pick(choices3) == 2) {
					this.obstacle4();
					obstacleTime += 2000; 
				}else {
					this.obstacle5();
					obstacleTime += 2000; 
				}
			}else{
				this.helltime();
				this.spawnStar(800,200+Math.random()*100);
			}    
  
     
		} 

		//end game spawn constant spikes
		if (score >= 15){
			if (game.time.now - game.time.pauseDuration > spikeTime) {
				spikeTime = game.time.now + 750 - game.time.pauseDuration;
				this.infinitePleasure();
			}
		}

		//for testing purposes, pressing X to skip to end game

		if (endgame.isDown){
			//game.state.states['gameover'].score = score;
			//game.state.start('gameover');
			jump_count = Infinity;
			score+=cheat;
			cheat = 0;

		}

			
	},


	//selects a obstacle then spawns it in game
	helltime: function (x,y){
		var hellchoice = [1,2,3,4];
		if (game.rnd.pick(hellchoice) == 1){
			this.spikesTop(800,0,2.3);
		}else if (game.rnd.pick(hellchoice) == 2){
			this.spikesBottom(800,550,2.1);
		}else if (game.rnd.pick(hellchoice) == 3){
			this.spikesBottom(800,550,2.3);
		}else {
			this.spikesTop(800,0,2.4);
		}
		//this.spikesTop(800,0,2.3);
	},

	//spawns a star
	spawnStar: function(x,y){
		var star = game.add.sprite(x,y,'star');
		this.stars.add(star);
		game.physics.arcade.enable(star);
		star.body.velocity.x = -125;
		star.checkWorldBounds = true;
		star.outOfBoundsKill = true;
	},

	//test
	spawnStuff:function(){
		this.spawnStar(800,400);
	},

	//all the obstacles
	spawnCrate: function(x,y,z){
		var crate = game.add.sprite(x,y,'crate');
		crate.scale.setTo(z,z);
		this.crates.add(crate);
		game.physics.arcade.enable(crate);
		crate.body.velocity.x = -125;
		crate.checkWorldBounds = true;
		crate.outOfBoundsKill = true;
	},

	spawnRock: function(x,y,z){
		var rock = game.add.sprite(x,y,'rock');
		rock.scale.setTo(z,z);
		this.crates.add(rock);
		game.physics.arcade.enable(rock);
		rock.body.velocity.x = -125;
		rock.checkWorldBounds = true;
		rock.outOfBoundsKill = true;
	},

	spawnStump: function(x,y){
		var stump = game.add.sprite(x,y,'stump');
		//stump.scale.setTo(1.25,1.25);
		this.crates.add(stump);
		game.physics.arcade.enable(stump);
		stump.body.velocity.x = -125;
		stump.checkWorldBounds = true;
		stump.outOfBoundsKill = true;
	},

	obstacle1: function(){
		//begining
		this.spawnRock(800,500,0.75);
		this.spawnStar(820,370);  

	},

	obstacle2: function(){
		this.spawnCrate(800,480,0.75);
		this.spawnStar(820,370);  
	},

	obstacle3: function(){
		this.spawnStump(880,500);
		this.spawnRock(800,500,0.75);
		this.spawnStar(830,370);  
	},

	obstacle4: function(){
		this.spawnCrate(800,480,0.75);
		this.spawnCrate(860,480,0.75);
		this.spawnCrate(860,420,0.75);
		this.spawnStar(830,320); 
	},

	obstacle5: function(){
		this.spawnCrate(800,480,0.75);
		this.spawnCrate(860,480,0.75);
		this.spawnCrate(920,480,0.75);
		this.spawnCrate(860,420,0.75);
		this.spawnStar(880,320);  
	},


	spikesTop: function(x,y,z){
		var spike = game.add.sprite(x,y,'spike');
		spike.anchor.setTo(.5,.5)
		spike.scale.setTo(1,-z);
		this.spikes.add(spike);
		game.physics.arcade.enable(spike);
		spike.body.velocity.x = -125;
		spike.checkWorldBounds = true;
		spike.outOfBoundsKill = true;
	},

	

	spikesBottom: function(x,y,z){
		var spike = game.add.sprite(x,y,'spike');
		spike.anchor.setTo(.5,.5)
		spike.scale.setTo(1,z);
		this.spikes.add(spike);
		game.physics.arcade.enable(spike);
		spike.body.velocity.x = -125;
		spike.checkWorldBounds = true;
		spike.outOfBoundsKill = true;
	},

	infinitePleasure: function(){
		this.spikesTop(800,0,1);
		this.spikesBottom(800,550,1);
	},

	//function for collecting star
	collectStar: function(player,star){
		//destroy star and add points
		star.kill();
		score+=1;
		//change score text
		scoretext.text = 'Score: ' + score;
		if (score % 5 == 0){
			jump_count++;
		} 
	},

	//send player to gameover screen
	killPlayer: function(player, obstacle){
		//sound.mute = true;
		sound.stop();
		bgm.stop();
		game.state.states['gameover'].score = score;
		game.state.start('gameover');
	}

};