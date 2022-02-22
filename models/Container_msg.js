const { response } = require('express');
const fs = require('fs');
class Container_msg{
   constructor(location){
      this.location=location;
   }
   async getAll(){
      try {
         const msg_all = await fs.promises.readFile(this.location, 'utf-8')
         return JSON.parse(msg_all)
      } catch (error) {
         return []
      }
   }
   async save(obj){
      let oldMsj = await this.getAll();
      // console.log ("<----> ",oldMsj)
      oldMsj.push(obj)
      try {
         await fs.promises.writeFile(`${this.location}`,JSON.stringify(oldMsj,null,2))
         console.log('guardado con exito');
      }
      catch(err){
         console.log ('errrrrrr'+err)
      }
      return obj;
   }
}
module.exports = Container_msg;