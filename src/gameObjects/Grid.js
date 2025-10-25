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

    static whatIs() {
       return '--- Это класс сетки ---';
    }

    create(){
        
    }

    randomAddShips(ship,x=0,y=0){
        if(x==0&&y==0){
            x=Math.floor(Math.random() * (9 - 0 + 1)) + 0;
            y=Math.floor(Math.random() * (9 - 0 + 1)) + 0;
        }
        
        

        const ran = Math.floor(Math.random() * (1 - 0 + 1)) + 0

        if( ran == 1){
            ship.orientation = 'vertical';
        }else{
            ship.orientation = 'horizontal';
        }        

        const result = this.addShips(ship,x,y);

        if(!result){
            // if(ran === 0){
                this.randomAddShips(ship);
            // }else{
                // this.randomAddShips(ship,x,y+1);
            // }
            
        }
    }

    addShips(ship,x,y){

        // смотрим его координаты 
        // смотрим занятые кординаты
        
        const cordsShips = this.getCordsShips();

        // колличество палуб
        const deks = [];
        
        for (let i=0; i <= ship.size-1; i++) {
            if (ship.orientation === 'horizontal'){
                deks.push({x:x+i,y:y})                
            }else{
                deks.push({x:x,y:y+i})
            }            
        }

        let out_line = deks.some(
            (deskPoint) => deskPoint.x < 0 || deskPoint.x > 9 || deskPoint.y < 0 || deskPoint.y > 9)
        if(out_line){
            return false;
        }


        // если эти кординаты свободны добовляем корабль
        // Проверяем, на занятую клетку
        if(this.checkDeskArray(deks)){            
            ship.cord = {x:x, y:y};
            ship.cordDeks = deks;
            this.ships.push(ship);
        
        }else{
            console.log(this.getCordsShips(),'<---- не добавили')
            return false
        }
        console.log(this.getCordsShips(),'<---- добавили')
        return true
    }

    checkDeskArray(desk) {
        let deksInGrid = this.getCordsShips();
        deksInGrid = [...deksInGrid, ...this.getOutlineDesk(deksInGrid) ]
        return !desk.some(
            (deskPoint) => deksInGrid.some(
                (gridPoint) => gridPoint.x === deskPoint.x && gridPoint.y === deskPoint.y
            )
        );
    }

    getOutlineDesk(arr){
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
        console.log(result)
        return result
    }

    addShipsToGrid(){
        const desks = this.getCordsShips();

        desks.forEach(item =>{
            console.log(item.x,item.y)
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
        return this.ships.reduce((acc, ship) => acc.concat(ship.cordDeks), []);
    }

    // old_chekDeksArray(desk){
    //     const deks_in_grid = this.getCordsShips();  
    //     for (var i = desk.length - 1; i >= 0; i--){
    //         for (var j = deks_in_grid.length - 1; j >= 0; j--) {
    //             if(deks_in_grid[j].x == desk[i].x && deks_in_grid[j].y == desk[i].y){
    //                 return false;
    //             }
    //         }
    //     }
    //     return true
    // }

    // getCordsShips() {
    //     // Получаем все координаты занятых клеток
    //     const cords = []
    //     this.ships.forEach( ship => {
    //         ship.cordDeks.forEach( deck => {                
    //             cords.push(deck);
    //         });
    //     });        
    //     return cords
    // }
}