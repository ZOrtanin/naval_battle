// Класс клетки

export class Cell extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, size, full, empty) {
        super(scene, x * size, y * size, empty);
        this.gridX = x;
        this.gridY = y;
        this.state = 'empty'; //
        this.setInteractive();
        //this.on('pointerdown', () => this.scene.events.emit('cellClicked', this.gridX, this.gridY));
        
        this.on('pointerdown', (pointer, x, y, event) => {
            console.log(`Клик по спрайту на координатах: X=${this.gridX}, Y=${this.gridY}`);

            // let board = this.parentContainer.parentContainer;
            // if(board.checkShot(this.gridX, this.gridY)){
            //     this.updateState('hit');
            // }else{
            //     this.updateState('miss');
            // }

            this.scene.events.emit('cell-clicked', this);
            
        });

    }

    updateState(state) {
        this.state = state;
        this.setTexture(state === 'hit' ? 'hit' : 'miss');
    }
}