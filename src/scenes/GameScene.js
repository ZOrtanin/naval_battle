
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

        const newShip = new ship(this,0,1);
        this.my_grid.addShips(newShip,0,0);  

        const newShip1 = new ship(this,0,1);
        this.my_grid.addShips(newShip1,0,0);   

        const newShip2 = new ship(this,0,4);
        this.my_grid.addShips(newShip2,1,1); 

        this.my_grid.addShipsToGrid();          

        console.log(this.my_grid)  
    
    }
    update (){
        this.my_grid.render(); 
    }
}