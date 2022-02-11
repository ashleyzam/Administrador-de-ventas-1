const open = document.querySelector('.btn')
const modalContains = document.querySelector('.modal-container')
const modalPrincipal = document.querySelector('.containermodal-newSale')
const close = document.querySelector('.close')
const selectOption = document.querySelector('.select-option')
const btnSave = document.querySelector('#btn-save')
const table = document.querySelector('.col1')//.getElementsByTagName('tbody')[0]
const secondTable = document.querySelector('.table2')
const sucCentro = document.querySelector('#centro')
const sucCaballito = document.querySelector('#caballito')
const modalEliminarVenta = document.querySelector('.modal-eliminar-venta')
const blurContains = document.querySelector('#blur-container')
var productoEliminarId = 0;
let nuevoArrVentas = []


open.addEventListener('click',(e)=>{
    e.preventDefault()
    modalContains.classList.remove('hide')
    modalContains.classList.add('show')
    blurContains.style.filter = 'blur(5px)'
    //cargarVendedoras()
})

close.addEventListener('click',(e)=>{
    e.preventDefault()
    modalContains.classList.remove('show')
    modalContains.classList.add('hide')
    blurContains.style.filter = 'none'

})

window.addEventListener('keydown',(e)=>{
    console.log(e.key)
    if(e.key === 'Escape' || e.key === 'Scape') {
      modalContains.classList.add('hide')
      modalEliminarVenta.classList.add('hide')
      blurContains.style.filter = 'none'
    }return false
})

const vendedoras = ["Ada", "Grace", "Hedy", "Sheryl"];
              //  0    1      2           3          4
              // id, fecha, vendedora, sucursal, productos
const ventas =  [[1, new Date(2019, 1, 4), "Grace", "Centro", ["Monitor GPRS 3000", "Motherboard ASUS 1500"]], 
                 [2, new Date(2019, 0, 1), "Ada", "Centro", ["Monitor GPRS 3000", "Motherboard ASUS 1500"]],
                 [3, new Date(2019, 0, 2), "Grace", "Caballito", ["Monitor ASC 543", "Motherboard MZI"]], 
                 [4, new Date(2019, 0, 10), "Ada", "Centro", ["Monitor ASC 543", "Motherboard ASUS 1200"]], 
                 [5, new Date(2019, 0, 12), "Grace", "Caballito", ["Monitor GPRS 3000", "Motherboard ASUS 1200"]]
                ];

const precios = [["Monitor GPRS 3000", 200],
                 ["Motherboard ASUS 1500", 120],
                 ["Monitor ASC 543", 250], 
                 ["Motherboard ASUS 1200", 100],      
                 ["Motherboard MZI", 30],
                 ["HDD Toyiva", 90],
                 ["HDD Wezter Digital", 75],
                 ["RAM Quinston", 110], 
                 ["RAM Quinston Fury", 230]];


let obtenerPreciosSumados =(productos)=>{
    let acumuladorDePrecios = 0
    for(let i = 0; i < productos.length; i++){
        for(let a = 0 ; a < precios.length; a++){
            if(productos[i] === precios[a][0]){
                //console.log(precios[a][1])
                    acumuladorDePrecios+=precios[a][1]
            }}}return acumuladorDePrecios;
}

//FUNCIÓN PARA CARGAR DATOS DEL ARRAY VENTAS
let cargarVentas = (arrVentas) => {
    //console.log(table)
let str = `<tr>
            <th>Fecha</th>
            <th>Vendedora</th>
            <th class="tede">Sucursal</th>
            <th class="tede">Componentes</th>
            <th>Precio</th>
            <th>Acciones</th>
            </tr>
            <tbody id="t-body"></tbody>`
    let newRow = table.insertRow(table.rows.length);
    newRow.innerHTML = str;

for(let i = 0; i < arrVentas.length; i++){ 
    let it = `<tr class="uno" id = "fila">
                <td class= "eliminar-venta">${arrVentas[i][1].toLocaleDateString()}</td>
                <td class"eliminar-venta">${arrVentas[i][2]}</td>
                <td class="tede eliminar-venta">${arrVentas[i][3]}</td>
                <td class="tede eliminar-venta">${arrVentas[i][4]}</td>
                <td class="tede eliminar-venta">${obtenerPreciosSumados(arrVentas[i][4])}</td>
                <td><i class="far fa-edit boton-editar" id="editar-" aria-hidden="true"></i>
                <i class="far fa-trash-alt btn-eliminar-venta" onclick="funcDelete(${i})""></i></td>
             </tr>`;
    let newRow = table.insertRow(table.rows.length);
    newRow.innerHTML = it;
    
    }
}

cargarVentas(ventas)  

let funcDelete= (id)=>{
    modalEliminarVenta.classList.remove('hide')
    modalEliminarVenta.classList.add('show')
    blurContains.style.filter = '(5px)'
    productoEliminarId = id
}
let acceptDeleteBtn = document.querySelector('#btn-accept-deletion')

acceptDeleteBtn.addEventListener('click', e =>{
    if(nuevoArrVentas.length == 0){
        
        nuevoArrVentas =  ventas.filter( (item,index) => index != productoEliminarId)
    }else{
        nuevoArrVentas =  nuevoArrVentas.filter( (item,index) => index != productoEliminarId)
    }
       blurContains.style.filter = 'none'
       modalEliminarVenta.classList.add('hide')

       limpiarTabla();
       cargarVentas(nuevoArrVentas)  
})

const selectComponentes = document.querySelector('.select-componentes')
let cargarComponentes = () =>{
    for(let i = 0; i < precios.length; i++){
        const listaComponentes = document.createElement('option')
            listaComponentes.innerText =`${precios[i][0]}`
             selectComponentes.appendChild(listaComponentes)
    }
}
cargarComponentes()

let cantidadVentas = (sucursal) =>{
    let totalVentas = 0
    ventas.filter(venta =>{
        if(venta[3] === sucursal){
            totalVentas+=obtenerPreciosSumados(venta[4])
    
        }       
    })
    return totalVentas
}


//FUNCION  PARA CARGAR CANTIDAD VENTAS POR SUCURSAL.
let cargarVentasPorSucursal=()=>{
    sucCaballito.innerHTML = cantidadVentas('Caballito')
    sucCentro.innerHTML = cantidadVentas('Centro')
}

cargarVentasPorSucursal()

let cargarVendedoras = () =>{
    for(let i = 0 ; i < vendedoras.length; i ++){
        const listaVendedoras = document.createElement('option')
        //listaVendedoras.setAttribute('value',`${vendedoras[i]}`)
        //listaVendedoras.setAttribute('id',`${vendedoras[i]}`)
        listaVendedoras.innerText = `${vendedoras[i]}`
        selectOption.appendChild(listaVendedoras)
        

    }
}

cargarVendedoras()

let limpiarTabla = () => {
    table.innerHTML  = ""
    // console.log(table)
    //cargarVentas()
}