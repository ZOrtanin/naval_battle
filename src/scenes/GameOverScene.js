// Сцена конца игры

import { Scene } from 'phaser';

export default class GameOverScene extends Scene {
    constructor() {
        super('GameOverScene');
        console.log('GameOverScene - загрузилась');
    }

    init(data) {
        // this.winner = data.winner;
    }

    create() {
        // this.add.text(400, 300, `Победитель: ${this.winner === 'player' ? 'Игрок' : 'Компьютер'}`, { fontSize: '32px' })
        //     .setOrigin(0.5);
        // const restartButton = this.add.text(400, 400, 'Новая игра', { fontSize: '24px' })
        //     .setInteractive()
        //     .setOrigin(0.5)
        //     .on('pointerdown', () => this.scene.start('MenuScene'));
    }
}