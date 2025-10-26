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

    randomAddShips(ship,rec=0,x=0,y=0){
        // рандомное размещение кораблей

        let deksInGrid = this.getCordsShips();
        deksInGrid = [...deksInGrid, ...this.getOutlineDesk(deksInGrid) ]

        let allInGrid = this.getAllCords();

        const emptyInGrid = allInGrid.filter(
              (item1) => !deksInGrid.some((item2) => item2.x === item1.x && item2.y === item1.y)
            );

        const lenEmptyCords = emptyInGrid.length;
        //console.log(lenEmptyCords)
        const newCords = emptyInGrid[Math.floor(Math.random() * ((lenEmptyCords-1) - 0 + 1)) + 0];

        //console.log(Math.floor(Math.random() * (lenEmptyCords - 0 + 1)) + 0,lenEmptyCords,emptyInGrid)
        x = newCords.x;
        y = newCords.y;

        // выбор случайных координат
        // if(x==0&&y==0){
        //     x=Math.floor(Math.random() * (9 - 0 + 1)) + 0;
        //     y=Math.floor(Math.random() * (9 - 0 + 1)) + 0;
        // }

        const ran = Math.floor(Math.random() * (1 - 0 + 1)) + 0

        if( ran == 1){
            ship.orientation = 'vertical';
        }else{
            ship.orientation = 'horizontal';
        }        

        const result = this.addShips(ship,x,y);

        if(!result){
            rec+=1;
            rec+= this.randomAddShips(ship,rec);        
        }
            //console.log('рекурсия:',rec ,' палубы:',ship.size);
            // return rec;
        

        return rec;
    }

    addShips(ship,x,y){ 
        // добовляем корабль       
        // смотрим занятые кординаты на поле      
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

        // проверяем выходят кординаты палуб за поле
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
            //console.log('не добавили')
            return false
        }
        //console.log('добавили')
        return true
    }

    checkDeskArray(desk) {
        // проверяем пересечение палуб и пространство около них
        let deksInGrid = this.getCordsShips();
        deksInGrid = [...deksInGrid, ...this.getOutlineDesk(deksInGrid) ]
        return !desk.some(
            (deskPoint) => deksInGrid.some(
                (gridPoint) => gridPoint.x === deskPoint.x && gridPoint.y === deskPoint.y
            )
        );
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

    getAllCords(){
        let cords = []
        this.board.forEach((row,r) =>{
            row.forEach((col,c) =>{                
                cords.push({x:c,y:r})
            });
        });
        return cords;
    }

    getCordsShips() {
        // получаем все занятые клетки 
        return this.ships.reduce((acc, ship) => acc.concat(ship.cordDeks), []);
    }

    addShipsToGrid(){
        // Добовляем кординаты палуб на поле
        const desks = this.getCordsShips();

        desks.forEach(item =>{            
            this.board[item.x][item.y] = 1;
        })
    }

    rebootGrid(){
        // сброс доски
        this.board = Array.from({ length: 10 }, () => Array(10).fill(0));
        this.ships = []; 
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