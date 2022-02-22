const fs = require('fs');
class Contenedor{
    constructor(location){
        this.location=location;
        this.aux_array=[]
    }
    async save(obj){
        await fs.promises.readFile(`${this.location}`,"utf8")
        .then ( res => {
            this.aux_array = JSON.parse(res);
            let newID=null;
            if (this.aux_array.length == 0){
                newID=0;
            } else {
                newID=this.aux_array[this.aux_array.length-1].id;
                newID++;
            }
            console.log ('newID: '+newID);
            obj.id=newID;
            this.aux_array.push(obj);
        })
        .catch(err => {
            console.log (err)
        })        
        try {
            await fs.promises.writeFile(`${this.location}`,JSON.stringify(this.aux_array,null,2))
            console.log('guardado con exito');
        }
        catch(err){
            console.log ('errrrrrr'+err)
        }
        return obj;
    }
    async update(obj,id){
        let aux;
        let response=null;
        console.log ('verb: put');
        console.log (obj);
        console.log (typeof(obj));
        console.log (id);
        await fs.promises.readFile(`${this.location}`,"utf8")
        .then( res => {
            aux=JSON.parse(res);
            let pos = aux.findIndex(m=> m.id == id)
            if (pos!=-1) {
                obj.id=id;
                aux.splice(pos, 1, obj);
            } else {
                response='PRODUCTO NO ENCONTRADO'
                console.log (pos+" NO EXISTE")
                return (response);
            }
        })
        .catch(err => {
            console.log (err)
        })
        try {
            await fs.promises.writeFile(`${this.location}`,JSON.stringify(aux,null,2))
            response='Actualizacion completa. \n';
        }
        catch(err){
            response='Error, no se pudo actualizar. \n'
        }
        return (response);
    }
    
    async getById(num_id){
        let aRetornar=null;
        await fs.promises.readFile(`${this.location}`,"utf8")
        .then (res=> {
            let aux=JSON.parse(res);
            aRetornar=aux.find(m => m.id == num_id)
        })
        return aRetornar;
    }
    async getAll(){
        let aRetornar;
        await fs.promises.readFile(`${this.location}`,"utf8")
        .then (res=> {
            aRetornar=res;
        })
        .catch (error => console.log (error))
        if (aRetornar.length==0){
            aRetornar=[];
        }
        return aRetornar;
    }
    async deleteById(num){
        let aux2;
        this.aux_array=[];
        await fs.promises.readFile(`${this.location}`,"utf8")
        .then (res=> {
            aux2=JSON.parse(res);
            this.aux_array = aux2.filter(m => m.id != num)
            // aux2.forEach(element => {
            //     if (element.id!=num){
            //         this.aux_array.push(element)
            //     }
            // });
            console.log('this.aux_array');
            console.log(this.aux_array);
        })
        .catch(err =>{
            console.log ('errrrDeleteById '+err)
        })
        try {
            await fs.promises.writeFile(`${this.location}`,JSON.stringify(this.aux_array,null,2))
            console.log('guardado con exito');
            // console.log (this.aux_array)
        }
        catch(err){
            console.log ('errrrrrr'+err)
        }
    }
    async deleteAll(){
        try {
            await fs.promises.writeFile(`${this.location}`,"[]")
            console.log('borrado con exito');
        }
        catch(err){
            console.log ('errrrrrr'+err)
        }
    }
}
module.exports = Contenedor;