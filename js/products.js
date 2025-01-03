

document.querySelector(".username").textContent = JSON.parse(localStorage.getItem("user")).username
let elProductTable = document.querySelector(".product-table")

let elModalWrapper = document.querySelector(".modal-wrapper")
let elModalInner = document.querySelector(".modal-inner")

let productsList = JSON.parse(localStorage.getItem("products")) || []

// Modal Case
elModalWrapper.addEventListener("click",(e) => e.target.id == "wrapper" && elModalWrapper.classList.add("scale-0"))
// Modal Case

let elCategory1 = document.querySelector(".category-1")
let elCategory2 = document.querySelector(".category-2")

elCategory1.addEventListener("click", () => {
    elCategory1.className = "category-1 font-bold text-[35px] leading-[40px] pb-[8px] text-[#009398] border-b-[3px] cursor-pointer border-[#009398]"
    elCategory2.className = "category-2 font-bold text-[35px] leading-[40px] pb-[8px] text-[#A6A6A6] border-b-[3px] cursor-pointer border-transparent"
    renderProducts(productsList, elProductTable, "0")
})

elCategory2.addEventListener("click", () => {
    elCategory2.className = "category-2 font-bold text-[35px] leading-[40px] pb-[8px] text-[#009398] border-b-[3px] cursor-pointer border-[#009398]"
    elCategory1.className = "category-1 font-bold text-[35px] leading-[40px] pb-[8px] text-[#A6A6A6] border-b-[3px] cursor-pointer border-transparent"
    renderProducts(productsList, elProductTable, "1")
})

// Add Part start 

function handleAddBtnClick(){
    elModalWrapper.classList.remove("scale-0")
    elModalInner.innerHTML = `
        <form class="add-form w-[915px] mx-auto">
            <label class="inline-block w-full mb-[33px]">
                <input class="add-choose-img hidden" type="file"/>
                <img class="mx-auto add-img" src="./images/empty-img.png" alt="Choose img" width="691" height="316"/>
            </label>
            <div class="flex justify-between">
                <div class="w-[49%] pl-[10px] flex flex-col space-y-[20px]">
                    <label>
                        <span class="font-normal text-[#898989] text-[24px] leading-[33px] pl-[5px] mb-1">Категории</span>
                        <select name="category_id" class="w-full py-[15px] pl-[10px] text-[25px] rounded-[5px] bg-slate-200">
                            <option value="0">Каркасные</option>
                            <option value="1">Надувные</option>
                        </select>
                    </label>
                    <label>
                        <span class="font-normal text-[#898989] text-[24px] leading-[33px] pl-[5px] mb-1">Стартая цена</span>
                        <input name="old_price" class="w-full py-[15px] pl-[10px] text-[25px] rounded-[5px] bg-slate-200" placeholder="Стартая цена"/>
                    </label>
                    <label>
                        <span class="font-normal text-[#898989] text-[24px] leading-[33px] pl-[5px] mb-1">Рамка</span>
                        <input name="frame" class="w-full py-[15px] pl-[10px] text-[25px] rounded-[5px] bg-slate-200" placeholder="Рамка"/>
                    </label>
                    <label>
                        <span class="font-normal text-[#898989] text-[24px] leading-[33px] pl-[5px] mb-1">Размер (м)</span>
                        <input name="size" class="w-full py-[15px] pl-[10px] text-[25px] rounded-[5px] bg-slate-200" placeholder="Размер (м)"/>
                    </label>
                </div>
                <div class="w-[49%] pr-[10px] flex flex-col space-y-[20px]">
                    <label>
                        <span class="font-normal text-[#898989] text-[24px] leading-[33px] pl-[5px] mb-1">Количество</span>
                        <input name="amount" class="w-full py-[15px] pl-[10px] text-[25px] rounded-[5px] bg-slate-200" placeholder="Количество"/>
                    </label>
                    <label>
                        <span class="font-normal text-[#898989] text-[24px] leading-[33px] pl-[5px] mb-1">Цена со скидкой (сум)</span>
                        <input name="discont_price" class="w-full py-[15px] pl-[10px] text-[25px] rounded-[5px] bg-slate-200" placeholder="Цена со скидкой (сум)"/>
                    </label>
                    <label>
                        <span class="font-normal text-[#898989] text-[24px] leading-[33px] pl-[5px] mb-1">Глубина(см)</span>
                        <input name="depth" class="w-full py-[15px] pl-[10px] text-[25px] rounded-[5px] bg-slate-200" placeholder="Глубина(см)"/>
                    </label>
                    <label>
                        <span class="font-normal text-[#898989] text-[24px] leading-[33px] pl-[5px] mb-1">Статус</span>
                        <select name="status" class="w-full py-[15px] pl-[10px] text-[25px] rounded-[5px] bg-slate-200" placeholder="Статус">
                            <option value="0">Рекомендуем</option>
                            <option value="1">Cкидка</option>
                            <option value="2">Нет в наличии</option>
                        </select>
                    </label>
                </div>
            </div>
            <button class="add-btn-submit py-[10px] w-[237px] block mx-auto mt-[33px] bg-[#3F8C8E] text-white font-bold text-[20px] text-center rounded-[35px] shadow-md">Добавить</button>
        </form>
    `

    let elAddChooseInput = document.querySelector(".add-choose-img")
    let elAddImg = document.querySelector(".add-img")
    elAddChooseInput.addEventListener("change", function(e){
        elAddImg.src = URL.createObjectURL(e.target.files[0]);
    })


    let elAddForm = document.querySelector(".add-form")
    let elBtnSubmit = document.querySelector(".add-btn-submit")

    elAddForm.addEventListener("submit", function(e){
        e.preventDefault()
        const data = {
            id: productsList.length ? productsList[productsList.length - 1].id + 1 : 1,
            categoryId: e.target.category_id.value,
            imgUrl: elAddImg.src,
            oldPrice: e.target.old_price.value,
            discountPrice: e.target.discont_price.value,
            amount: e.target.amount.value,
            frame: e.target.frame.value,
            size: e.target.size.value,
            depth: e.target.depth.value,
            status: e.target.status.value,
        }

        elBtnSubmit.innerHTML = `<img class="scale-[1.5] mx-auto" src="./images/loading.png" alt="Loading..." width="38" height="37">`

        setTimeout(() => {
            elBtnSubmit.innerHTML = `Добавить`
            productsList.push(data)
            localStorage.setItem("products", JSON.stringify(productsList))
            renderProducts(productsList, elProductTable, data.categoryId)
            elModalWrapper.classList.add("scale-0")
            if(data.categoryId == "0"){
                elCategory1.className = "category-1 font-bold text-[35px] leading-[40px] pb-[8px] text-[#009398] border-b-[3px] cursor-pointer border-[#009398]"
                elCategory2.className = "category-2 font-bold text-[35px] leading-[40px] pb-[8px] text-[#A6A6A6] border-b-[3px] cursor-pointer border-transparent"
            }
            else{
                elCategory2.className = "category-2 font-bold text-[35px] leading-[40px] pb-[8px] text-[#009398] border-b-[3px] cursor-pointer border-[#009398]"
                elCategory1.className = "category-1 font-bold text-[35px] leading-[40px] pb-[8px] text-[#A6A6A6] border-b-[3px] cursor-pointer border-transparent"
            }
        },1000)
        
    })
}

// Add Part end 

// Render Product start

function renderProducts(arr, list, categoryId){
    list.innerHTML = null
    arr.filter(item => item.categoryId == categoryId).forEach(item => {
        let elTR = document.createElement("tr")
        elTR.innerHTML = `
            <td class="py-[7px]">
                <img class="mx-auto" src="${item.imgUrl}" alt="Pool1" width="97" height="55">
            </td>
            <td class="py-[7px] flex flex-col">
                <span class="before:w-[75px] before:rotate-[5deg] before:top-[5px] before:rounded-full before:h-[2px] before:absolute before:bg-[#FF0000] relative text-[12px] text-slate-400 leading-[13.44px]">1${item.oldPrice} сум</span>
                <strong class="text-[15px] text-black leading-[13.44px]">1${item.discountPrice} сум</strong>
            </td>
            <td class="py-[20px] text-[20px]">${item.amount}</td>
            <td class="py-[20px] text-[20px]">${item.frame}</td>
            <td class="py-[20px] text-[20px]">${item.size}</td>
            <td class="py-[20px] text-[20px]">${item.depth}</td>
            <td class="py-[20px] text-[20px]">${item.categoryId == "0" ? "Каркасные" : "Надувные"}</td>
            <td class="py-[20px]">
                <div class="flex items-center gap-[18px]">
                    <button onclick="handleEditBtnClick(${item.id})">
                        <img src="./images/edit-icon.svg" alt="Edit Icon" width="22" height="22">
                    </button>
                    <button onclick="handleDeleteProduct(${item.id})">
                        <img src="./images/delete-icon.svg" alt="Delete Icon" width="22" height="22">
                    </button>
                </div>
            </td>
        `
        list.append(elTR)
    })
}
renderProducts(productsList, elProductTable, "0")

// Render Product end 

// Delete P start 

function handleDeleteProduct(id){
    const deleteIndex = productsList.findIndex(item => item.id == id)
    productsList.splice(deleteIndex, 1)
    renderProducts(productsList, elProductTable)
    localStorage.setItem("products", JSON.stringify(productsList))
}

// Delete P end 

// Edit P start

function handleEditBtnClick(id){
    elModalWrapper.classList.remove("scale-0")
    let editProduct = productsList.find(item => item.id == id)

    elModalInner.innerHTML = `
        <form class="edit-form w-[915px] mx-auto">
            <label class="inline-block w-full mb-[33px]">
                <input class="edit-choose-img hidden" type="file"/>
                <img class="error-img mx-auto edit-img" src="${editProduct.imgUrl}" alt="Choose img" width="691" height="316"/>
            </label>
            <div class="flex justify-between">
                <div class="w-[49%] pl-[10px] flex flex-col space-y-[20px]">
                    <label>
                        <span class="font-normal text-[#898989] text-[24px] leading-[33px] pl-[5px] mb-1">Категории</span>
                        <select name="category_id" class="w-full py-[15px] pl-[10px] text-[25px] rounded-[5px] bg-slate-200">
                            <option ${editProduct.categoryId == "0" && "selected"} value="0">Каркасные</option>
                            <option ${editProduct.categoryId == "1" && "selected"} value="1">Надувные</option>
                        </select>
                    </label>
                    <label>
                        <span class="font-normal text-[#898989] text-[24px] leading-[33px] pl-[5px] mb-1">Стартая цена</span>
                        <input value=${editProduct.oldPrice} name="old_price" class="w-full py-[15px] pl-[10px] text-[25px] rounded-[5px] bg-slate-200" placeholder="Стартая цена"/>
                    </label>
                    <label>
                        <span class="font-normal text-[#898989] text-[24px] leading-[33px] pl-[5px] mb-1">Рамка</span>
                        <input value=${editProduct.frame} name="frame" class="w-full py-[15px] pl-[10px] text-[25px] rounded-[5px] bg-slate-200" placeholder="Рамка"/>
                    </label>
                    <label>
                        <span class="font-normal text-[#898989] text-[24px] leading-[33px] pl-[5px] mb-1">Размер (м)</span>
                        <input value=${editProduct.size} name="size" class="w-full py-[15px] pl-[10px] text-[25px] rounded-[5px] bg-slate-200" placeholder="Размер (м)"/>
                    </label>
                </div>
                <div class="w-[49%] pr-[10px] flex flex-col space-y-[20px]">
                    <label>
                        <span class="font-normal text-[#898989] text-[24px] leading-[33px] pl-[5px] mb-1">Количество</span>
                        <input value=${editProduct.amount} name="amount" class="w-full py-[15px] pl-[10px] text-[25px] rounded-[5px] bg-slate-200" placeholder="Количество"/>
                    </label>
                    <label>
                        <span class="font-normal text-[#898989] text-[24px] leading-[33px] pl-[5px] mb-1">Цена со скидкой (сум)</span>
                        <input value=${editProduct.discountPrice} name="discont_price" class="w-full py-[15px] pl-[10px] text-[25px] rounded-[5px] bg-slate-200" placeholder="Цена со скидкой (сум)"/>
                    </label>
                    <label>
                        <span class="font-normal text-[#898989] text-[24px] leading-[33px] pl-[5px] mb-1">Глубина(см)</span>
                        <input value=${editProduct.depth} name="depth" class="w-full py-[15px] pl-[10px] text-[25px] rounded-[5px] bg-slate-200" placeholder="Глубина(см)"/>
                    </label>
                    <label>
                        <span class="font-normal text-[#898989] text-[24px] leading-[33px] pl-[5px] mb-1">Статус</span>
                        <select name="status" class="w-full py-[15px] pl-[10px] text-[25px] rounded-[5px] bg-slate-200" placeholder="Статус">
                            <option ${editProduct.status == "0" && "selected"} value="0">Рекомендуем</option>
                            <option ${editProduct.status == "1" && "selected"} value="1">Cкидка</option>
                            <option ${editProduct.status == "2" && "selected"} value="2">Нет в наличии</option>
                        </select>
                    </label>
                </div>
            </div>
            <button class="edit-btn-submit py-[10px] w-[237px] block mx-auto mt-[33px] bg-[#3F8C8E] text-white font-bold text-[20px] text-center rounded-[35px] shadow-md">Изменить</button>
        </form>
    `

    let elAddChooseInput = document.querySelector(".edit-choose-img")
    let elEditImg = document.querySelector(".edit-img")
    elAddChooseInput.addEventListener("change", function(e){
        elEditImg.src = URL.createObjectURL(e.target.files[0]);
    })


    let elEditForm = document.querySelector(".edit-form")
    elEditForm.addEventListener("submit", function(e){
        e.preventDefault()
        editProduct.imgUrl = elEditImg.src 
        editProduct.category_id = e.target.category_id.value
        editProduct.old_price = e.target.old_price.value
        editProduct.frame = e.target.frame.value
        editProduct.size = e.target.size.value
        editProduct.amount = e.target.amount.value
        editProduct.discountPrice = e.target.discont_price.value
        editProduct.depth = e.target.depth.value
        editProduct.status = e.target.status.value

        let elEditBtn = document.querySelector(".edit-btn-submit")
        elEditBtn.innerHTML = `<img class="scale-[1.5] mx-auto" src="./images/loading.png" alt="Loading..." width="38" height="37">`

        setTimeout(() => {
            elEditBtn.innerHTML = `Изменить`
            elModalWrapper.classList.add("scale-0")
            renderProducts(productsList, elProductTable, e.target.category_id.value)
            localStorage.setItem("products", JSON.stringify(productsList))
            if(e.target.category_id.value == "0"){
                elCategory1.className = "category-1 font-bold text-[35px] leading-[40px] pb-[8px] text-[#009398] border-b-[3px] cursor-pointer border-[#009398]"
                elCategory2.className = "category-2 font-bold text-[35px] leading-[40px] pb-[8px] text-[#A6A6A6] border-b-[3px] cursor-pointer border-transparent"
            }
            else{
                elCategory2.className = "category-2 font-bold text-[35px] leading-[40px] pb-[8px] text-[#009398] border-b-[3px] cursor-pointer border-[#009398]"
                elCategory1.className = "category-1 font-bold text-[35px] leading-[40px] pb-[8px] text-[#A6A6A6] border-b-[3px] cursor-pointer border-transparent"
            }
        },1000)
    })


    let elErrorImg = document.querySelector(".error-img")
    elErrorImg.addEventListener("error", function(e){
        e.target.src = "./images/empty-img.png"
    })
} 
// Edit P end 


