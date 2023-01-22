export interface UnoccupiedMessageType {
  _id: "NoID";
  username: "";
  msg: "";
  location: number;
}

export interface MessageDocument{
  user: string
  username: string;
  msg: string;
  location: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  _id: string;
}

export function baseMessageArray(){
  let baseArray: (UnoccupiedMessageType|MessageDocument)[] = [];
  for(let i=0; i<81; i++){
    baseArray[i] = {_id: "NoID", username: "", msg: "", location: i}
  }
  return baseArray;
}
