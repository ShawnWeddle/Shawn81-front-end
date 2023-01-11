export function SetShadowColor(occupied:boolean){
  let ShadowColor: string;
  if (occupied) {
    ShadowColor = "#888888";
  } else {
    ShadowColor = "#880000";
  }

  return ShadowColor;
}

export function SetTextColorByCellColor(cellColor: string){
  let textColor: string = "#FFFFFF";
  
  const hexcodeRegex: RegExp = /^#[0-9A-F]{6}$/i;

  if(!hexcodeRegex.test(cellColor)){
    return textColor;
  }

  let r: number = parseInt(cellColor.slice(1,3), 16);
  let g: number = parseInt(cellColor.slice(3,5), 16);
  let b: number = parseInt(cellColor.slice(5,7), 16);

  let rC = r/255;
  let gC = g/255;
  let bC = b/255;

  let Cmax = Math.max(rC, gC, bC);
  let Cmin = Math.min(rC, gC, bC);

  let L = (Cmax + Cmin)/2;

  if(L>0.5){
    textColor = "#000000";
  } else {
    textColor = "#FFFFFF"
  }

  return textColor;
}

export function SetHoverColorByCellColor(cellColor: string){
  let hoverColor: string = "#FFFFFF";
  
  const hexcodeRegex: RegExp = /^#[0-9A-F]{6}$/i;

  if(!hexcodeRegex.test(cellColor)){
    return hoverColor;
  }

  let r: number = parseInt(cellColor.slice(1,3), 16);
  let g: number = parseInt(cellColor.slice(3,5), 16);
  let b: number = parseInt(cellColor.slice(5,7), 16);

  let rP: number;
  let gP: number;
  let bP: number;

  rP = Math.floor(r/2);
  gP = Math.floor(g/2);
  bP = Math.floor(b/2);

  const RGBtoHex = (num: number) => {
    let N = num.toString(16);
    if(N.length === 1){
      return "0" + N;
    } else {
      return N;
    }
  }

  hoverColor = `#${RGBtoHex(rP)}${RGBtoHex(gP)}${RGBtoHex(bP)}`;

  return hoverColor;
}