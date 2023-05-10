const product_form = document.getElementById('product-form');
const msg = document.querySelector('.msg');
const single_product = document.querySelector('.single-product');
const product_list = document.getElementById('product_list');
const product_update_form = document.getElementById('product-update-form');


// get all product
const getAllProduct = () => {

    // get all LS data
    const data = readLsData('product');
    let list = '';
    // check Ls data exists
    if(!data || data.length == 0){
        list = `
            <tr>
                <td colspan="7" class="text-center"> No product found </td>
            </tr>
        `;
    }

    // show all data to LS
    if(data && data.length > 0) {
        let finalAmount = 0;
        data.map((item, index) => {
            finalAmount += (item.price * item.quantity);
            list += `
            <tr>
                 <td>${index+1}</td>
                 <td><img src="${item.photo}" alt=""></td>
                 <td>${item.name}</td>
                <td>${item.price} BDT</td>
                <td>${item.quantity}</td>
                <td>${item.price * item.quantity} BDT</td>
                <td>
                    <a class="btn btn-primary btn-sm product_single" product_index="${index}" data-bs-toggle="modal" href="#shop_single_modal"><i class="fas fa-eye"></i></a>

                    <a class="btn btn-warning btn-sm product_update" product_index="${index}" data-bs-toggle="modal" href="#edit-single-product"><i class="fas fa-edit"></i></a>

                    <a class="btn btn-danger btn-sm product-delete" product_index="${index}" href=""><i class="fas fa-trash"></i></a>
                 </td>
            </tr>
            `;
        });

        list += `
        <tr>
            <td colspan="6" class='text-end'>Total Amount = ${finalAmount} BDT</td>
        </tr>
        `;
    }
    product_list.innerHTML = list;
}

// Form submut
product_form.onsubmit = (e) => {
    e.preventDefault();
    
    // get Element
    const form_data = new FormData(e.target);
    let productData = Object.fromEntries(form_data.entries());
    let {name, price, quantity, photo} = Object.fromEntries(form_data.entries());


    // value check
    if(!name || !price || ! quantity || !photo){
        msg.innerHTML = setAlert('All fields are requierd')
    }else{
        createLsData('product', productData)

        msg.innerHTML = setAlert('Data stable !', 'success');
        product_form.reset();
        getAllProduct()
    }

}
getAllProduct();

// Single product show
product_list.onclick = (e) => {
    e.preventDefault();

    if(e.target.classList.contains('product_single')){
         // get single product id
    let index = e.target.getAttribute('product_index');
    let data = readLsData('product')

    // get data key
    const {name,price, quantity, photo} = data[index];

    //send data to modal
    single_product.innerHTML = `
        <img class="shadow-lg" src="${photo}" alt="">
        <h2>${name}</h2>
        <p>Price : ${price} BDT</p>
    `;
}
if (e.target.classList.contains('product_update')){
// update single product
product_list.onclick = (e) => {
    e.preventDefault();
     
    // get single product id
    let index = e.target.getAttribute('product_index');

    //get product value
    let data =readLsData('product');
    const {name, price, quantity, photo} = data[index];

    // set form value
    product_update_form.innerHTML = `
    <div class="my-3">
    <label for="">Name</label>
    <input name="name" value="${name}" type="text" class="form-control">
</div>
<div class="my-3">
    <label for="">Price</label>
    <input name="price" value="${price}" type="text" class="form-control">
</div>
<div class="my-3">
    <label for="">Quantity</label>
    <input name="quantity" value="${quantity}" type="text" class="form-control">
</div>
<div class="my-3"> 
    <input name="index" value="${index}" type="hidden" class="form-control">
</div>
<div class="my-3">
    <img class="w-100" src="${photo}" alt="">
</div>
<div class="my-3">
    <label for="">Photo</label>
    <input name="photo" value="${photo}" type="text" class="form-control">
</div>
<div class="my-3">
    <input type="submit" class="btn btn-primary w-100" value="Update now">
</div>
    `;
};

// product update form submit
product_update_form.onsubmit = (e) => {
    e.preventDefault();

    // get form data
    const form_data = new FormData(e.target);
    const {name, price, quantity, photo, index} = Object.fromEntries(form_data.entries());

    // get all data
    let all_data = readLsData('product');
    all_data[index] = {
        name, price, quantity, photo
    };
    
    // update our data
    updateLsData('product', all_data)
    getAllProduct()
};

}

// Product delete
if(e.target.classList.contains('product-delete')){

    let confrm = confirm('Are you sure to delete this item?');

    if(confrm){
    // get data index
    let index = e.target.getAttribute('product_index');
    let data = readLsData('product');

    // delete data index
    data.splice(index, 1);

    // update letest record
    updateLsData('product', data);

    }else{
        alert('Okey product not delete')
    }
    // data reload
    getAllProduct()


};
    };
        

  

   

