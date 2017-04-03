import { Injectable } from '@angular/core';
import {Buffer} from "buffer/";
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class SecretService {

  constructor(private localStService: LocalStorageService) { }
 xor (secret, message) {
  let buffer = new Buffer(message.length);
  let i = 0 ;
  let j=0;
   for(let temp of message){
   buffer[j++] = temp ^ secret[i++];
   if(i==secret.length)i=0;
  }  
  return buffer;
}

    public XorBytes(Secret: string, myArray: Array<number>) : string{
        let mybuf = new Buffer(Secret);
        let mybuf2 = new Buffer(myArray, 'utf-8');
        return (this.xor(mybuf, mybuf2).toString('utf-8'));
        }
          
  public toInternal(CurrentObject: any): any{
   if(CurrentObject==null)return null;
   let array = Object.getOwnPropertyNames(CurrentObject);
   for(let prop of array){
        if(CurrentObject[prop]!=null)CurrentObject[prop] = this.XorBytes(this.localStService.get('SuperSecret') as string, CurrentObject[prop]);
   }
   return CurrentObject;
   }
}
