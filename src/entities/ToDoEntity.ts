export class ToDoEntity{
    id: string;
    title: string;
    description: string;
    color: string;

    constructor(id: string, title: string, description: string, color?: string){
        this.id = id;
        this.title = title;
        this.description = description;
        this.color = color ? color : `rgb(${Math.floor(Math.random()*255)},
         ${Math.floor(Math.random()*255)},
          ${Math.floor(Math.random()*255)})`;
    }

    getId(): string{
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