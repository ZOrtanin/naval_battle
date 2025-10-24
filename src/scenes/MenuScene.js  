// Главное меню
import { Scene } from 'phaser';

export class MenuScene extends Scene {
    constructor() {
        super('MenuScene');
    }

    create() {
        this.add.text(400, 300, 'Морской бой', { fontSize: '32px' }).setOrigin(0.5);
        const startButton = this.add.text(400, 400, 'Новая игра', { fontSize: '24px' })
            .setOrigin(0.5)
            .setInteractive();
        startButton.on('pointerdown', () => this.scene.start('PlacementScene'));
    }
}