import Phaser from 'phaser'

import BootScene from './scenes/BootScene';
import GameScene from './scenes/GameScene';
import GameOverScene from './scenes/GameOverScene';

// Конфигурация Phaser
const config = {
    type: Phaser.AUTO,
    width: 900,
    height: 600,
    backgroundColor: '#d9d9d9',
    parent: 'gameContainer',
    scene: [ BootScene, GameScene, GameOverScene ]
};

// Запуск игры
const game = new Phaser.Game(config);