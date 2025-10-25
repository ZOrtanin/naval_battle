// Класс корабля

export default class Ship extends Phaser.GameObjects.Sprite {
    constructor(scene, id, size) {
        super(scene, 0, 0, `ship${size}`);
        //console.log('Ship - загрузилась');
        this.id = id;
        this.size = size;
        this.orientation = 'horizontal';
        this.hits = 0;
        this.cord = {x:0,y:0}
        this.cordDeks = []
        this.create()
        // this.scene.add.existing(this);
        // this.setInteractive();
        // this.scene.input.setDraggable(this);
    }

    static whatIs() {
       return '--- Это класс коробля ---';
      }

    create(){
        //console.log('корабыль создан')
        
    }

    addGrid(cord){
        this.cordDeks = cord;
    }

    hit() {
        // this.hits++;
        // if (this.hits === this.size) {
        //     this.setTexture('ship_destroyed');
        // }
    }

    rotate() {
        // this.orientation = this.orientation === 'horizontal' ? 'vertical' : 'horizontal';
        // Обновление спрайта
    }
}