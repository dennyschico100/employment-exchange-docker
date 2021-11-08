const app = require("./app")

const main = ()=>{
    
    app.listen(app.get("PORT"),()=>{
        console.log(`server running on port ${app.get("PORT")}`)
    })
}
main()