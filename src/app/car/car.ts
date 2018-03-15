export class Car {
  constructor(
    public carType: string,
    public id: number
  ){}

}
export class Places extends Car{
  public status:boolean;
  constructor(type,id){
    super(type,id);
    this.status = false;
  }

}



