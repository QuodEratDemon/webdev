//create game

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');

//load up states from other files
game.state.add('menu', menuState);
game.state.add('howtoplay', howtoState);
game.state.add('main', mainState);
game.state.add('gameover', overState);

game.state.start('menu');
