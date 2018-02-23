const fs =require('fs');
const path =require('path');
const pathConfig =path.join(__dirname, '../config/tree.json');
class CdnMonitor{
    constructor(){
        this.delSession = this.delSession.bind(this);
    }
    getCategory(req,res){
        let data = JSON.parse(fs.readFileSync(pathConfig));
        res.json(data.category);
    }
    addSession(req,res){
        let data = JSON.parse(fs.readFileSync(pathConfig));
        let id = data.id;
        let category = data.category;
        while(data.category[`s${id}`]){
            id++;
        }
        let key =`s${id}`
        let newSession = Object.assign({
            id:key,
            children:[],
        },req.body);
        data.category[key] =newSession;
        data.category[newSession.parent].children.push(key);
        fs.writeFileSync(pathConfig,JSON.stringify(data));
        res.json(data.category);
    }
    delSession(req,res){
        console.log(this);
        try{
        let data = JSON.parse(fs.readFileSync(pathConfig));
        let category = data.category;
        let id =req.body.id;
        let nodes = category[category[id].parent].children;
        nodes.splice(nodes.indexOf(id),1);
        this.delChildren(id,category);
        fs.writeFileSync(pathConfig,JSON.stringify(data));
        res.json(data.category);}catch(e){
            console.log(e);
        }
    }
    delChildren(id,category){
        category[id].children.forEach(id=>{
            this.delChildren(id,category);
        })
        delete category[id];
    }
}
module.exports = new CdnMonitor()