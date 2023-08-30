const loadPhone = async (searchTag, isShowAll) =>{
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchTag}`)
    const data = await response.json();
    const phones = data.data;
    displayPhone(phones, isShowAll)
}

const displayPhone = (phones, isShowAll) =>{
    const displayArea = document.getElementById("phone-card");
    displayArea.innerHTML = "";
    const showAllBtn = document.getElementById("show-all-btn");
    if(phones.length > 12 && !isShowAll){
        showAllBtn.classList.remove("hidden");
        showAllBtn.classList.add("block")
    }
    else{
        showAllBtn.classList.add("hidden")
    }

    if(!isShowAll){
        phones = phones.slice(0, 12)
    }
    for(const item of phones){
        const createCard = document.createElement("div");
        createCard.classList = `rounded-[.3rem] border-[.09rem] `
        createCard.innerHTML = `
            <div class="img-div bg-[#f3f8ff] rounded-md  p-8">
                <img src="${item.image}" alt="" class="mx-auto md:w-[50%]"">        
            </div>
            <div class="card-info p-2">
                <h1 class="text-3xl font-bold py-4 " >${item.phone_name} </h1>
                <p class="text-xs pb-2">There are many variations of passages of available, but the majority have suffered</p>
                <strong>$999</strong>
                <button onclick="handleShowDetails('${item.slug}')" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 font-semibold rounded-md w-fit block mx-auto my-5 ">Show Details</button>
            </div>
        `;
        displayArea.appendChild(createCard)
    }
    loaderSnipperDisplay(false)
}

const handleShowDetails = async (id)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    console.log(res);
    const data = await res.json()
    const phone = data.data
    showDetailsModal(phone)
}

const showDetailsModal = (phone)=>{
    show_details_modal.showModal()
    
    const modalDetails = document.getElementById("modal-details");
    modalDetails.innerHTML = `
        <img src=" ${phone.image} " alt="" class="mx-auto">
        <h1 class="font-bold text-4xl pt-5"> ${phone.name} </h1>
        <p class="text-xs py-3 ">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
        <p> <strong> Brand: </strong> <span class="text-sm"> ${phone.brand} </span> </p>
        <p> <strong> Storage: </strong> <span class="text-sm"> ${phone.mainFeatures.storage} </span> </p>
        <p> <strong>Display Size: </strong> <span class="text-sm"> ${phone.mainFeatures.displaySize} </span> </p>
        <p> <strong>ChipSet: </strong> <span class="text-sm"> ${phone.mainFeatures.chipSet} </span> </p>
        <p> <strong>Memory: </strong> <span class="text-sm"> ${phone.mainFeatures.memory} </span> </p>
        <p> <strong>Release: </strong> <span class="text-sm"> ${phone.releaseDate} </span> </p>
    `
}

const searchBtn = (isShowAll)=>{
    loaderSnipperDisplay(true)
    const searchInputField = document.getElementById("search-field");
    const searchInputFieldValue = searchInputField.value
    loadPhone(searchInputFieldValue, isShowAll)
}

const loaderSnipperDisplay =(isLoading)=>{
    const loaderSnipper = document.getElementById("loader");
    if(isLoading){
        loaderSnipper.classList.remove("hidden")
    }else{
        loaderSnipper.classList.add("hidden")
    }
}
const handleShowAll = ()=>{
    searchBtn(true)
}