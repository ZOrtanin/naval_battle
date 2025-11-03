// Класс игровой сетки
import Phaser from 'phaser';

export default class Grid extends Phaser.GameObjects.Container {
    constructor(scene, x, y, type) {
        super(scene, x, y);
        this.scene.add.existing(this);
        //console.log('Grid - загрузилась');

        this.scene = scene;
        this.name = 'new_grid';
        this.role = 'Enemy'        
        this.visible = true;
        this.cords = {x:x,y:y}
        this.type = type;

        this.cells = [];
        this.board = Array.from({ length: 10 }, () => Array(10).fill(0));

        this.rect = new Phaser.Geom.Rectangle(0, 0, 40, 40);        

        this.graphics = this.scene.add.graphics({ 
                                lineStyle: { width: 1, color: 0x66777C }, 
                                fillStyle: { color: 0x66777C }
                            }); 
        this.graphics.angle = 45;
        this.graphics.x = 285;
        this.graphics.y = 0;
        this.add(this.graphics); // <-- Добавь эту строку       
        this.ships = [];        
       

        // this.board[1][1] = 1;
        // console.log(this.board)
        
        
    }

    static whatIs() {
       return '--- Это класс сетки ---';
    }

    create(){        
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

    // -------- корабль

    randomAddShip(ship,rec=0,x=0,y=0){
        // рандомное размещение кораблей

        // выбор случайных координат ( для уменьшения числа рекурсий )
        let deksInGrid = this.getCordsShips();
        deksInGrid = [...deksInGrid, ...this.getOutlineDesk(deksInGrid) ]

        const emptyInGrid = this.getAllCords().filter(
              (item1) => !deksInGrid.some((item2) => item2.x === item1.x && item2.y === item1.y)
            );
        
        const newCords = emptyInGrid[Math.floor(Math.random() * emptyInGrid.length)];

        x = newCords.x;
        y = newCords.y;
        
        // выбор случайного положенеия
        ship.orientation = 
            Math.floor(Math.random() * 2) == 1 
            ? 'horizontal':'vertical';           

        // пробуем разместить
        // const result = this.addShips(ship,x,y);
        const result = ship.addShip(this,x,y);

        // для анализа рекурсий
        if(!result){
            rec+=1;
            rec+= this.randomAddShip(ship,rec);        
        }else{
            //console.log('рекурсия:',rec ,' палубы:',ship.size);
            //return rec;
        }
        return rec;
    }

    getOutlineDesk(){
        // получаем пространство около короблей
        return this.ships.reduce((acc, ship) => acc.concat(ship.cordOutLine), []);
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

    // -------- корабль

    rebootGrid(){
        // сброс доски
        this.board = Array.from({ length: 10 }, () => Array(10).fill(0));
        this.ships = []; 
    }

    render(){
        if(this.type == 'big'){
            this.size_cell = 40
        }
        if(this.type == 'small'){
            this.size_cell = 25
            this.rect = new Phaser.Geom.Rectangle(0, 0, 25, 25);
        }
        
        //console.log(this.board[1][1])  
        this.graphics.clear();     

        for (let i = 0; i < 10; i++) {            
            for (let j = 0; j < 10; j++) {
                this.rect.x = this.size_cell*i + this.cords.x;
                this.rect.y = this.size_cell*j + this.cords.y;

                if(this.board[i][j] == 0 ){
                    this.graphics.strokeRectShape(this.rect);
                }

                if(this.board[i][j] == 1 && this.role == 'Player'){
                    this.graphics.fillRectShape(this.rect);
                }else{
                    this.graphics.strokeRectShape(this.rect);
                }
                
                
            }
        }
    }    

    setInteractive() {
        this.cells.forEach(row => row.forEach(cell => cell.setInteractive()));
    }

    // addShips(ship,x,y){ 
        //     // добовляем корабль       
        //     // смотрим занятые кординаты на поле      
        //     //const cordsShips = this.getCordsShips();

        //     // получаем предпологаемые палубы
        //     const deck = ship.getDeck(x,y); 

        //     // проверяем выходят кординаты палуб за поле
        //     let out_line = deck.some(
        //         (deskPoint) => deskPoint.x < 0 || deskPoint.x > 9 || deskPoint.y < 0 || deskPoint.y > 9)
        //     if(out_line){
        //         return false;
        //     }

        //     // если эти кординаты свободны добовляем корабль
        //     // Проверяем, на занятую клетку
        //     let newResult = !this.ships.reduce(
        //                 (acc, ship) => acc.concat(
        //                     ship.checkDeskArray(deck)
        //                 ),[]
        //             ).includes(false); 

        //     // если все хорошо добовляем
        //     if(newResult){            
        //         ship.cord = {x:x, y:y};
        //         ship.cordDeks = deck;
        //         ship.addOutLineDeck();
        //         this.ships.push(ship);
            
        //     }else{
        //         //console.log('не добавили')
        //         return false
        //     }
        //     //console.log('добавили')
        //     return true
        // }

    // checkDeskArray(desk) {
        //     // претендент на удаление

        //     let newResult = !this.ships.reduce(
        //                 (acc, ship) => acc.concat(
        //                     ship.checkDeskArray(desk)
        //                 ),[]
        //             ).includes(false);        

        //     // проверяем пересечение палуб и пространство около них
        //     let deksInGrid = this.getOutlineDesk();
        //     //deksInGrid = [...deksInGrid, ...this.getOutlineDesk() ]

        //     let result = !desk.some(
        //         (deskPoint) => deksInGrid.some(
        //             (gridPoint) => gridPoint.x === deskPoint.x && gridPoint.y === deskPoint.y
        //         )
        //     );

        //     console.log(result,newResult);

        //     return result;
        // }  

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