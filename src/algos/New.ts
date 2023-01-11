export interface UnoccupiedMessageType {
  _id: "NoID";
  color: "#BABABA";
  username: "";
  msg: "";
  location: number;
  
}

export interface MessageDocument{
  user: string
  username: string;
  msg: string;
  color: string;
  location: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  _id: string;
}

export function baseMessageArray(){
  let baseArray: (UnoccupiedMessageType|MessageDocument)[] = [];
  for(let i=0; i<81; i++){
    baseArray[i] = {_id: "NoID", color: "#BABABA", username: "", msg: "", location: i}
  }
  return baseArray;
}
