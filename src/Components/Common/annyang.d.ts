// src/annyang.d.ts

declare module 'annyang' {
    interface Annyang {
      addCommands(commands: Record<string, Function>): void;
      start(): void;
      abort(): void;
    }
  
    const annyang: Annyang;
    export = annyang;
  }
  