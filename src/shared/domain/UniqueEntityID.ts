
// import uuid from 'uuid/v4';
import{v4} from 'uuid'
import { Identifier } from '../core/Identifier'

export class UniqueEntityID extends Identifier<string | number>{
  constructor (id?: string | number) {
    super(id ? id : v4())
  }
}