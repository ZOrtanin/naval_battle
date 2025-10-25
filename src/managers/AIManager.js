// Логика ИИ

export class AIManager {
    constructor(enemyGrid) {
        this.enemyGrid = enemyGrid;
    }

    aiTurn() {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        this.enemyGrid.cells[x][y].updateState('miss'); // Упрощённая логика
    }
}