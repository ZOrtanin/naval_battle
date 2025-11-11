//Загрузка ресурсов
import { Scene } from 'phaser';


export default class BootScene extends Scene {
    constructor() {
        super({ key: 'BootScene', active: false });
        console.log('BootScene - загрузилась');
    }

    preload() {
        
    }

    create() {

        const arr_texture_gen = [
            {name:'cell_empty',size:32,full:0},
            {name:'cell_full',size:32,full:1},
            {name:'hit',size:32,full:1},
            {name:'cell_empty_small',size:10,full:0},
            {name:'cell_full_small',size:10,full:1},
        ];

        arr_texture_gen.forEach( item => {

            const graphics = this.add.graphics();

            if(item.full){
                graphics.fillStyle(0x808080);
            }else{
                graphics.fillStyle(0xffffff);
            }            

            graphics.lineStyle(1, 0x808080);
            graphics.fillRect(0, 0, item.size, item.size);
            graphics.strokeRect(0, 0, item.size, item.size);
            graphics.generateTexture(item.name, item.size, item.size);
            graphics.destroy();

        });


        const graphics = this.add.graphics();
        graphics.fillStyle(0x808080);
        graphics.lineStyle(20, 0xffffff);
        graphics.fillRect(0, 0, 32, 32);
        graphics.strokeRect(0, 0, 32, 32);
        graphics.generateTexture('miss', 32, 32);
        graphics.destroy();

        // const graphics_new = this.add.graphics();
        // graphics_new.fillStyle(0x808080);
        // graphics_new.lineStyle(1, 0x808080);
        // graphics_new.fillRect(0, 0, 32, 32);
        // graphics_new.strokeRect(0, 0, 32, 32);
        // graphics_new.generateTexture('cell_full', 32, 32);
        // graphics_new.destroy();

        // const graphics_small = this.add.graphics();
        // graphics_small.fillStyle(0xffffff);
        // graphics_small.lineStyle(1, 0x808080);
        // graphics_small.fillRect(0, 0, 10, 10);
        // graphics_small.strokeRect(0, 0, 10, 10);
        // graphics_small.generateTexture('cell_empty_small', 10, 10);
        // graphics_small.destroy();

        // const graphics_new_small = this.add.graphics();
        // graphics_new_small.fillStyle(0x808080);
        // graphics_new_small.lineStyle(1, 0x808080);
        // graphics_new_small.fillRect(0, 0, 10, 10);
        // graphics_new_small.strokeRect(0, 0, 10, 10);
        // graphics_new_small.generateTexture('cell_full_small', 10, 10);
        // graphics_new_small.destroy();

        this.scene.start('MenuScene');
    }
}