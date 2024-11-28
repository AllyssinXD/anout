export class ToDoEntity{
    private readonly id;
    private title;
    private description;
    private color;

    constructor(title: string){
        this.id = Date.now();
        this.title = title;
        this.description = "";
        this.color = `rgb(${Math.floor(Math.random()*255)},
         ${Math.floor(Math.random()*255)},
          ${Math.floor(Math.random()*255)})`;
    }

    getId(): number{
        return this.id;
    }

    getTitle(): string{
        return this.title;
    }

    getDescription(): string{
        return this.description;
    }

    getColor(): string{
        return this.color;
    }

    setTitle(title: string){
        this.title = title;
    }

    setDescription(description: string){
        this.description = description;
    }

    setColor(r: number, g: number, b: number){
        if(r > 255 || r < 0 || g > 255 || g < 0 || b > 255 || b < 0){
            throw new Error("Invalid color");
        }
        this.color = `rgb(${r}, ${g}, ${b})`;
    }
}