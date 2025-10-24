// Класс игровой сетки

export class Grid extends Phaser.GameObjects.Container {
    constructor(scene, x, y, type) {
        super(scene, x, y);
        this.type = type;
        this.cells = [];
        for (let i = 0; i < 10; i++) {
            this.cells[i] = [];
            for (let j = 0; j < 10; j++) {
                const cell = new Cell(scene, i, j);
                this.cells[i][j] = cell;
                this.add(cell);
            }
        }
        this.scene.add.existing(this);
    }

    setInteractive() {
        this.cells.forEach(row => row.forEach(cell => cell.setInteractive()));
    }
}