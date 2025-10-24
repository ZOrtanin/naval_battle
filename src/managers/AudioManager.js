// Управление звуком

export class AudioManager {
    constructor(scene) {
        this.scene = scene;
    }

    playSound(key) {
        this.scene.sound.play(key);
    }
}