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
        const graphics = this.add.graphics();
        graphics.fillStyle(0xffffff);
        graphics.lineStyle(1, 0x808080);
        graphics.fillRect(0, 0, 32, 32);
        graphics.strokeRect(0, 0, 32, 32);
        graphics.generateTexture('cell_empty', 32, 32);
        graphics.destroy();

        const graphics_new = this.add.graphics();
        graphics_new.fillStyle(0x808080);
        graphics_new.lineStyle(1, 0x808080);
        graphics_new.fillRect(0, 0, 32, 32);
        graphics_new.strokeRect(0, 0, 32, 32);
        graphics_new.generateTexture('cell_full', 32, 32);
        graphics_new.destroy();

        this.scene.start('MenuScene');
    }
}