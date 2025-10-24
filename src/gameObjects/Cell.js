// Класс клетки

export class Cell extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x * 32, y * 32, 'cell');
        this.gridX = x;
        this.gridY = y;
        this.state = 'empty';
        this.setInteractive();
        this.on('pointerdown', () => this.scene.events.emit('cellClicked', x, y));
    }

    updateState(state) {
        this.state = state;
        this.setTexture(state === 'hit' ? 'hit' : 'miss');
    }
}