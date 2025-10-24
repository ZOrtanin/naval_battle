// Класс корабля

export class Ship extends Phaser.GameObjects.Sprite {
    constructor(scene, id, size) {
        super(scene, 0, 0, `ship${size}`);
        this.id = id;
        this.size = size;
        this.orientation = 'horizontal';
        this.hits = 0;
        this.scene.add.existing(this);
        this.setInteractive();
        this.scene.input.setDraggable(this);
    }

    hit() {
        this.hits++;
        if (this.hits === this.size) {
            this.setTexture('ship_destroyed');
        }
    }

    rotate() {
        this.orientation = this.orientation === 'horizontal' ? 'vertical' : 'horizontal';
        // Обновление спрайта
    }
}