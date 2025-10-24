import Phaser from 'phaser'

import BootScene from './scenes/BootScene';
import MenuScene from './scenes/MenuScene';
import PlacementScene from './scenes/PlacementScene';
import GameScene from './scenes/GameScene';
import GameOverScene from './scenes/GameOverScene';


// Конфигурация Phaser
const config = {
    type: Phaser.AUTO,
    width: 900,
    height: 600,
    backgroundColor: '#1a1a2e',
    parent: 'gameContainer',
    scene: [BootScene, MenuScene, PlacementScene, GameScene, GameOverScene]
};

// Запуск игры
const game = new Phaser.Game(config);




