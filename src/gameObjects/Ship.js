// Класс корабля

export default class Ship extends Phaser.GameObjects.Sprite {
    constructor(scene, id, size) {
        super(scene, 0, 0, `ship${size}`);
        //console.log('Ship - загрузилась');
        this.id = id;
        this.size = size;
        this.orientation = 'horizontal';
        this.hits = 0;
        this.cord = {x:0,y:0};
        this.cordDeks = [];
        this.cordOutLine = [];
        this.create();

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

    addOutLineDeck(){
        if(this.cordDeks!=[]){
            this.cordOutLine = this.getOutlineDesk(this.cordDeks);
        }else{
            console.log('палубы еще не добавлены');
        }        
    }

    getOutlineDesk(arr){
        // получаем пространство около коробля
        const mask = [
                        {x:-1,y:-1},{x:-1,y:0},{x:-1,y:1},
                        {x:0,y:-1},{x:0,y:0},{x:0,y:1},
                        {x:1,y:-1},{x:1,y:0},{x:1,y:1}
                    ];

        let result = [];

        arr.forEach( item => {
            mask.forEach(point =>{
                const x = item.x + point.x
                const y = item.y + point.y

                if(x>-1&&y>-1&&x<10&&y<10){
                    result.push({x:x,y:y})
                }

            });
        });        

        return result
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