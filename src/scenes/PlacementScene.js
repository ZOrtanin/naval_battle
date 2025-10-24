// Сцена расстановки кораблей

import { Scene } from 'phaser';
import Grid from '../gameObjects/Grid';
import Ship from '../gameObjects/Ship';

export class PlacementScene extends Scene {
    constructor() {
        super('PlacementScene');
    }

    create() {
        this.playerGrid = new Grid(this, 100, 100, 'player');
        this.ships = [
            new Ship(this, 1, 4), // 4-клеточный корабль
            new Ship(this, 2, 3), // 3-клеточный корабль (2 шт)
            // Другие корабли
        ];

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        const confirmButton = this.add.text(400, 500, 'Подтвердить', { fontSize: '24px' })
            .setInteractive()
            .on('pointerdown', () => {
                if (this.validatePlacement()) {
                    this.scene.start('GameScene', { playerShips: this.ships });
                }
            });
    }

    validatePlacement() {
        // Проверка, что корабли не пересекаются и находятся в пределах сетки
        return true; // Упрощённая логика
    }
}