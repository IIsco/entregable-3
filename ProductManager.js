import fs  from "fs";
import express from "express";

export default class ProductManager {
    constructor (){
         this.path = "./files/Productos.json";    
    }
    getproducts = async () => {

        if(fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, "utf-8");
            const result = JSON.parse(data);
            console.log(result);
            return result;
        } else {
            return [];
        }
     
    };// getProducts

    addProduct =  async (producto) => {
        const product = await this.getproducts();
        if (product.length === 0) {
            producto.id = 1;
        } else {
            producto.id = product[product.length - 1].id + 1;
        }
        product.push(producto);
        await fs.promises.writeFile(this.path, JSON.stringify(product, null, "\t")); // convirtiendo a String el array product, y dandole formato al string
        return producto;
    };  // addProduct
        
    getProductById = async (id) => {

        try {
            if (fs.existsSync(this.path)) {
                const result = await this.getproducts();

                let indexValue = result.find((event) => event.id === id);
               
                    return indexValue;
                
            }
        } catch (error) {
            console.log(error);
        }



    }
    
// leer spread operator investigar crud
updateProduct = async (id, stock, code, title, description, price, thumbnail) => { //recibe por parametro todo el objeto/producto

    try {
        const products = await this.getproducts();  //usamos el metodo que creaste antes para traernos TODOS los productos
        const product = products.find(product => product.id === id) //encontramos solo el que queremos modificar
        if (!product) { //validamos que si no se encuentra arrojamos el mensaje de error de abajo
            console.log(`no se encontro el producto con id ${id}`)
            return
        } else {   //aca predefinimos el objeto con los valores que nos llegan al invocar la funcion en index.js
            product.code = code,
                product.title = title,
                product.description = description,
                product.Price = price,
                product.thumbnail = thumbnail,
                product.stock = stock
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t")); //reescribimos el archivo .json ya modificado
            return console.log(product)
        }
    } catch (error) {
        console.error(error)
    }
} 


deleteProduct = async (id) => {
    fs.existsSync(this.path)
        console.log("Delete product");
        const Productos = await this.getproducts();
        const indiceProducto = Productos.findIndex(producto => producto.id === id);

        if (indiceProducto === -1){
            console.log("product not found");
            return[];
        }else{

            for (var i = 0; i < Productos.length; i++ ){
                if( Productos[i].id ===id){
                    Productos.splice(i, 1);
                    i--;
                }
                
            }// for
            await fs.promises.writeFile(this.path, JSON.stringify(Productos, null, "\t"));
            return Productos;
        }// else
    
};
    

       

    /*recibe dos parametros (id, cambios)
    const 
    buscar el libro clean code

    deleteproduts: googlear como borrar un elemento de un array en una posicion especifica.


    */
} // Class

