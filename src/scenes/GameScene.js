
import { Scene } from 'phaser';
import grid from '../gameObjects/Grid';
import ship from '../gameObjects/Ship';
import GameManager from '../managers/GameManager';

export default class NewGameScene extends Phaser.Scene {
    
    constructor() {
        super({ key: 'GameScene', active: true });
        console.log('GameScene - загрузилась');
        console.log(this);        
    }

    preload() { 

    }

    create() {
        


        this.player_grid = new grid(this,0,0,'small');
        this.player_grid.role = 'Player'        
        this.player_grid.scaleY = 0.7;

        this.enemy_grid = new grid(this,150,80,'big');
        this.enemy_grid.scaleY = 0.7;
        this.enemy_grid.createControll();

        this.manager = new GameManager(this,this.player_grid,this.enemy_grid)

        this.randomEnemyBord(this.player_grid);
        this.randomEnemyBord(this.enemy_grid);


        // this.ships = [];
        // const newShip_5 = new ship(this,0,5);
        // this.my_grid.randomAddShips(newShip_5);

        
        

        this.player_grid.addShipsToGrid();
        this.enemy_grid.addShipsToGrid();
        this.gameControl(this.player_grid);          

        console.log(this.input)  
    
    }

    randomEnemyBord(board){
        const newShip_4 = new ship(this,0,4);
        board.randomAddShip(newShip_4);
        console.log(board.getOutlineDesk())

        for (var i = 4 - 1; i >= 0; i--) {
            const newShip_1 = new ship(this,0,1);
            board.randomAddShip(newShip_1);
            console.log(board.getOutlineDesk()) // <---- странно тоже 36
        }        

        for (var i = 3 - 1; i >= 0; i--) {
            const newShip_2 = new ship(this,0,2);
            board.randomAddShip(newShip_2);
        }

        for (var i = 2 - 1; i >= 0; i--) {
            const newShip_3 = new ship(this,0,3);
            board.randomAddShip(newShip_3);
        }
    }

    testAddShip(){
        // проверка на колличество рекурсий при расстановки кораблей

        this.my_grid.rebootGrid();

        let rec = 0;
        let max = 0;
        let result = 0;

        const newShip_4 = new ship(this,0,4);
        result = this.my_grid.randomAddShip(newShip_4);
        max = result > max ? result : max;
        rec += result;


        for (var i = 2 - 1; i >= 0; i--) {
            const newShip_3 = new ship(this,0,3);
            result = this.my_grid.randomAddShip(newShip_3);
            max = result > max ? result : max;
            rec += result;
        }

        for (var i = 3 - 1; i >= 0; i--) {
            const newShip_2 = new ship(this,0,2);
            result = this.my_grid.randomAddShip(newShip_2);
            max = result > max ? result : max;
            rec += result;
        }

        for (var i = 4 - 1; i >= 0; i--) {
            const newShip_1 = new ship(this,0,1);
            result = this.my_grid.randomAddShip(newShip_1);
            max = result > max ? result : max;
            rec += result;
        }

        if(max>30){
            console.log('всего:',rec,' макс:',max);
        }
    }

    gameControl(object){
        
    }

    update (){
        this.player_grid.render(); 
        this.enemy_grid.render();

        //console.log(pointer)
    }
}