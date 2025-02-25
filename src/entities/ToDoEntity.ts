export class ToDoEntity{
    id: string;
    title: string;
    description: string;
    color: string;
    createdAt: Date;
    updatedAt: Date;
    dueDate: Date | null;

    constructor(id: string, title: string, description: string, color?: string){
        this.id = id;
        this.title = title;
        this.description = description;
        this.color = color ? color : `rgb(${Math.floor(Math.random()*255)},
         ${Math.floor(Math.random()*255)},
          ${Math.floor(Math.random()*255)})`;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.dueDate = null;
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

    setDueDate(date: Date){
        this.dueDate = date;
    }

    getDueDate(): Date | null{
        return this.dueDate;
    }
}