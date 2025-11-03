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

    addShip(grid,x,y){ 
        // добовляем корабль       
        // смотрим занятые кординаты на поле      
        //const cordsShips = this.getCordsShips();

        // получаем предпологаемые палубы
        const deck = this.getDeck(x,y); 

        // проверяем выходят кординаты палуб за поле
        let out_line = deck.some(
            (deskPoint) => deskPoint.x < 0 || deskPoint.x > 9 || deskPoint.y < 0 || deskPoint.y > 9)
        if(out_line){
            return false;
        }

        // если эти кординаты свободны добовляем корабль
        // Проверяем, на занятую клетку
        let newResult = !grid.ships.reduce(
                    (acc, ship_in_grid) => acc.concat(
                        ship_in_grid.checkDeskArray(deck)
                    ),[]
                ).includes(false); 

        // если все хорошо добовляем
        if(newResult){            
            this.cord = {x:x, y:y};
            this.cordDeks = deck;
            this.addOutLineDeck();
            grid.ships.push(this);
        
        }else{
            //console.log('не добавили')
            return false
        }
        //console.log('добавили')
        return true
    }

    getDeck(x,y){
        // получаем предпологаемые палубы
        const deck = [];

        for (let i=0; i <= this.size-1; i++) {
            if (this.orientation === 'horizontal'){
                deck.push({x:x+i,y:y})                
            }else{
                deck.push({x:x,y:y+i})
            }            
        }
        return deck;
    }

    checkDeskArray(desk,ship) {
        console.log(ship)
        // проверяем пересечение палуб и пространство около них
        let deksInGrid = this.cordOutLine;
        //deksInGrid = [...deksInGrid, ...this.getOutlineDesk() ]
        return !desk.some(
            (deskPoint) => deksInGrid.some(
                (gridPoint) => gridPoint.x === deskPoint.x && gridPoint.y === deskPoint.y
            )
        );
    }  

    addOutLineDeck(){
        // добовляем пространство возле коробля
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