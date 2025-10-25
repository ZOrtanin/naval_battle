// Класс игровой сетки
import Phaser from 'phaser';

export default class Grid extends Phaser.GameObjects.Container {
    constructor(scene, x, y, type) {
        super(scene, x, y);
        //console.log('Grid - загрузилась');

        this.scene = scene;
        this.cords = {x:x,y:y}
        this.type = type;

        this.cells = [];
        this.board = Array.from({ length: 10 }, () => Array(10).fill(0));

        this.rect = new Phaser.Geom.Rectangle(100, 100, 40, 40);        

        this.graphics = this.scene.add.graphics({ 
                                lineStyle: { width: 7, color: 0x66777C }, 
                                fillStyle: { color: 0x66777C }
                            });        
        this.ships = [];        
        this.scene.add.existing(this);

        // this.board[1][1] = 1;
        // console.log(this.board)
        
        
    }

    create(){
        
    }

    addShips(ship,x,y){

        // смотрим его координаты 
        // смотрим занятые кординаты
        // если эти кординаты свободны добовляем корабль
        const cordsShips = this.getCordsShips();

        // колличество палуб
        const deks = [];
        for (let i=0; i <= ship.size-1; i++) {
            deks.push({x:x+i,y:y})
        }

        // Проверяем на занятую клетку
        if(this.chekDeksArray(deks)){            
            ship.cord = {x:x, y:y};
            ship.cordDeks = deks;
            this.ships.push(ship);
        
        }else{
            console.log(this.getCordsShips(),'<---- не добавили')
        }
        console.log(this.getCordsShips(),'<---- добавили')

    }

    chekDeksArray(desk){
        const deks_in_grid = this.getCordsShips();  
        for (var i = desk.length - 1; i >= 0; i--){
            for (var j = deks_in_grid.length - 1; j >= 0; j--) {        
                console.log(deks_in_grid[j],desk[i])
                if(deks_in_grid[j].x == desk[i].x && deks_in_grid[j].y == desk[i].y){
                    return false;
                }
            }
        }
        return true
    }

    addShipsToGrid(){
        const desks = this.getCordsShips();

        desks.forEach(item =>{
            this.board[item.x][item.y] = 1;
        })

    }

    render(){
        
        //console.log(this.board[1][1])  
        this.graphics.clear();     

        for (let i = 0; i < 10; i++) {            
            for (let j = 0; j < 10; j++) {
                this.rect.x = 40*i + this.cords.x;
                this.rect.y = 40*j + this.cords.y;

                if(this.board[i][j] == 0 ){
                    this.graphics.strokeRectShape(this.rect);
                }else{
                    this.graphics.fillRectShape(this.rect);
                }
                
                
            }
        }
        
    }

    setInteractive() {
        this.cells.forEach(row => row.forEach(cell => cell.setInteractive()));
    }

    getCordsShips() {
        const cords = []
        //console.log(this.ships)

        this.ships.forEach( ship => {
            ship.cordDeks.forEach( deck => {
                //console.log(item.cordDeks)
                cords.push(deck);
            });
        });
        //console.log(cords)
        return cords
    }
}