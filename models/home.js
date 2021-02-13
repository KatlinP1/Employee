const fs = require('fs');
const path = require('path');
const filePath = path.join(path.dirname(require.main.filename), 'data', 'employee.json');

const getInfosfromfile = (cb) => {
    fs.readFile(filePath, (error, fileContent) =>{
        if(error){
            console.log(error);
           return cb ([]);
        }
        
        cb(JSON.parse(fileContent));
    });
}

module.exports = class Info {
    constructor(id, name, url, description) {
        this.id = id;
        this.name = name;
        this.imageUrl = url;
        this.description = description;
    }

    save(){ //uue info salvestamine - save to employee.json
        
        getInfosfromfile(infos => {
            if(this.id){ // if info with this id exists 
                 const existingInfoIndex = infos.findIndex(info => info.id === this.id);
                 const updatedInfos = [...infos]; //pull out existing products and store them in a new array - spreadoperator
                 updatedInfos [existingInfoIndex] = this;
                 fs.writeFile(filePath, JSON.stringify(updatedInfos), (error) => {
                     console.log(error);
                 });
                } else {
                    this.id = Math.random().toString();
                    infos.push(this);
                    fs.writeFile(filePath, JSON.stringify(infos), (error) =>{
                    console.log(error);
                    }); 

                 }
            
        }); //faili maha lugemiseks- et kuvada eelnevat infot 

    }

    //cb- objekt mis salvest andmed mis toimub funktsiooni sees
    static fetchAll(cb){
       getInfosfromfile(cb);
    }

    static findById(id, cb){
        getInfosfromfile(infos => {
            //filter a product by its id
            const info = infos.find(p => p.id === id);
            cb(info);
        });

    }

}