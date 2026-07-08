// El name esta en el record
export interface AnimationSprite {
  image: HTMLImageElement;
  drawWidth: number;
  drawHeigt: number;
  frameWidth: number;
  frameHeight: number;
  frameCount: number;
  animationType: AnimationType;
  description: string;
}

export interface AnimationFromJson {
  name: string;
  src: string;
  frames: number;
  animationType: string;
  description: string;
  frameWidth: number;
  frameHeight: number;
}

export interface AnimationSaveDb {
  blob: Blob;
  frameWidth: number;
  frameHeight: number;
  frameCount: number;
}

export enum AnimationType {
  loop = 'loop',
  once = 'once',
}
