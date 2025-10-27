
import { Scene } from 'phaser';
import grid from '../gameObjects/Grid'
import ship from '../gameObjects/Ship'

export default class NewGameScene extends Phaser.Scene {
    
    constructor() {
        super({ key: 'GameScene', active: true });
        console.log('GameScene - загрузилась');
        //this.scene = this;

        
    }

    preload() { 

    }

    create() {
        
        this.my_grid = new grid(this,100,100,'big');

        this.ships = [];

        const newShip_4 = new ship(this,0,4);
        this.my_grid.randomAddShips(newShip_4);

        for (var i = 4 - 1; i >= 0; i--) {
            const newShip_1 = new ship(this,0,1);
            this.my_grid.randomAddShips(newShip_1);
        }

        for (var i = 3 - 1; i >= 0; i--) {
            const newShip_2 = new ship(this,0,2);
            this.my_grid.randomAddShips(newShip_2);
        }

        for (var i = 2 - 1; i >= 0; i--) {
            const newShip_3 = new ship(this,0,3);
            this.my_grid.randomAddShips(newShip_3);
        }
        

        
        this.my_grid.addShipsToGrid();          

        console.log(this.my_grid)  
    
    }

    testAddShip(){
        // проверка на колличество рекурсий при расстановки кораблей

        this.my_grid.rebootGrid();

        let rec = 0;
        let max = 0;
        let result = 0;

        const newShip_4 = new ship(this,0,4);
        result = this.my_grid.randomAddShips(newShip_4);
        max = result > max ? result : max;
        rec += result;


        for (var i = 2 - 1; i >= 0; i--) {
            const newShip_3 = new ship(this,0,3);
            result = this.my_grid.randomAddShips(newShip_3);
            max = result > max ? result : max;
            rec += result;
        }

        for (var i = 3 - 1; i >= 0; i--) {
            const newShip_2 = new ship(this,0,2);
            result = this.my_grid.randomAddShips(newShip_2);
            max = result > max ? result : max;
            rec += result;
        }

        for (var i = 4 - 1; i >= 0; i--) {
            const newShip_1 = new ship(this,0,1);
            result = this.my_grid.randomAddShips(newShip_1);
            max = result > max ? result : max;
            rec += result;
        }

        if(max>30){
            console.log('всего:',rec,' макс:',max);
        }
    }

    update (){
        this.my_grid.render(); 
    }
}