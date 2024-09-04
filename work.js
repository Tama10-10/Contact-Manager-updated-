let img=document.querySelector('img');
img.addEventListener('click',function(){
    this.classList.toggle('clicked');
   load();


})


let show=document.getElementById('show');
let name=document.getElementById('username');
let number=document.getElementById('number');
let email=document.getElementById('email');
let image=document.getElementById('image');
let li=document.createElement('div');
li.className='centered-content';
li.id='display';
li.innerHTML=`<i class="fas fa-search"></i><input placeholder="Search" id='search'>`;
let search=li.querySelector('input');

search.addEventListener('keyup', function() {
    let query = this.value.toLowerCase();  // Get the search query and convert it to lowercase
    let contacts = document.querySelectorAll('#first-div'); 
     
    
    contacts.forEach(contact => {
        let name = contact.querySelector('h4').textContent.toLowerCase();  // Get the name of the contact
        let number = contact.querySelector('.number').textContent.toLowerCase();  // Get the number of the contact
        let email = contact.querySelector('.email').textContent.toLowerCase();  // Get the email of the contact
        
        // Check if the search query matches any part of the name, number, or email
        if (name.includes(query) || number.includes(query) || email.includes(query)) {
            contact.style.display = '';  // Show the contact
        } else {
            contact.style.display = 'none';  // Hide the contact
        }
    });
});

function submit()
{    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
     let c=0;
    contacts.forEach(contact => {
        for (let key in contact) {
            if (contact[key]=== name.value) {
              alert("This name already exists");
              c++;
            }
            else if (contact[key]=== email.value) {
              alert("This email is already taken");
              c++;
            }
            else if (contact[key]=== number.value) {
              alert("this number is already recorded ");
              c++;
            }
        }  
    });

    if(c==0)   
{
   let div=document.createElement('div');
   div.id="first-div";
    if(name.value&&number.value&&email.value)
    {   
    div.innerHTML=    `<div class="user-image"><img src="${image.value}"></div>
                      <div>
                     <div><i class="fa-solid fa-user"></i><h4>${name.value}<a href="#"onclick="remove(event)"><i style='font-size:14px' class="fa-solid fa-trash"></i></a>`+" "+`<a href="#" onclick="edit(event)"><i style='font-size:14px' class='fas'>&#xf044;</i></a></h4></div>
                      <div><i class="fa-solid fa-phone"></i><p class='number'>${number.value}<a href="#"onclick="remove(event)"><i style='font-size:14px' class="fa-solid fa-trash"></i></a>`+" "+`<a href="#" onclick="edit(event)"><i style='font-size:14px' class='fas'>&#xf044;</i></a></p></div>
                       <div> <i class="fa-solid fa-envelope"></i><p class='email'>${email.value}<a href="#"onclick="remove(event)"><i style='font-size:14px' class="fa-solid fa-trash"></i></a>`+" "+`<a href="#" onclick="edit(event)"><i style='font-size:14px' class='fas'>&#xf044;</i></a></p></div>
                         </div>`;
        
    
     li.appendChild(div);
     store(image.value,name.value,number.value,email.value);
   
                         show.appendChild(li);
                         if(show.contains(img))
                             {
                             show.replaceChild(li,img);
                             }
       image.value="";
       name.value="";
       number.value="";
       email.value="";
      
}
else
{
    alert("Please,fill up the neccessary details");
}
}}
function store(a,b,c,d)

{
    let entry=
    {
        image:a,
        name:b,
        number:c,
        email:d
    };
    let contacts;
    if(!localStorage.getItem('contacts'))
    {
        contacts=[];
    }
    else
    {
        contacts=JSON.parse(localStorage.getItem('contacts'));
    }
    contacts.push(entry);
    
    

localStorage.setItem('contacts',JSON.stringify(contacts));
       
   
}

function load()
{
    let contacts;
    if(!localStorage.getItem('contacts'))
    {
        contacts=[];
    }
    else
    {
        contacts=JSON.parse(localStorage.getItem('contacts'));
    }
    if(contacts.length==0)
    {
        alert("Contact list is Empty");
    }
    for(let i=0;i<contacts.length;i++)
    {    
          
        let div=document.createElement('div');
        div.id="first-div";
       
          
         div.innerHTML=    `<div class="user-image"><img src="${contacts[i].image}"></div>
                           <div>
                          <div><i class="fa-solid fa-user"></i><h4>${contacts[i].name}<a href="#"onclick="remove(event)"><i style='font-size:14px' class="fa-solid fa-trash"></i></a>`+" "+`<a href="#" onclick="edit(event)"><i style='font-size:14px' class='fas'>&#xf044;</i></a></h4></div>
                           <div><i class="fa-solid fa-phone"></i><p class='number'>${contacts[i].number}<a href="#"onclick="remove(event)"><i style='font-size:14px' class="fa-solid fa-trash"></i></a>`+" "+`<a href="#" onclick="edit(event)"><i style='font-size:14px' class='fas'>&#xf044;</i></a></p></div>
                             <div> <i class="fa-solid fa-envelope"></i><p class='email'>${contacts[i].email}<a href="#"onclick="remove(event)"><i style='font-size:14px' class="fa-solid fa-trash"></i></a>`+" "+`<a href="#" onclick="edit(event)"><i style='font-size:14px' class='fas'>&#xf044;</i></a></p></div>
                              </div>`;

         
          li.appendChild(div);
        
                              show.appendChild(li);
                              if(show.contains(img))
                                  {
                                  show.replaceChild(li,img);
                                  }
    }

}
function remove(e) {
    e.preventDefault(); // Prevent the default action of the link

    // Find the closest <a> element to the clicked target
    let link = e.target.closest('a');
    if (!link) return; // Exit if no <a> element is found

    // Find the closest <li> element to the <a> element
    let listItem = link.closest('div');
    deleteStorage(listItem);
    
    if (listItem) {
        listItem.remove(); // Remove the <li> element
    }
    
    
}

function deleteStorage(contact) {
    let text;
    if(contact.querySelector('h4'))
    {
       text =contact.querySelector('h4').firstChild.textContent;
    }
    else
    {
     text =contact.querySelector('p').firstChild.textContent;

    }
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    
    contacts = contacts.filter(contact => {
        // Find the property that matches the text
    
        for (let key in contact) {
            if (contact[key]=== text) {
                delete contact[key]; // Delete the property that matches
                break; // Break after deleting to avoid removing multiple properties
            }
           
           
        }
       
        return Object.keys(contact).length > 1;
    });

    localStorage.setItem('contacts', JSON.stringify(contacts));
    console.log("Updated contacts:", contacts);
}
function edit(e)
{
    let element;
    if(e.target.closest('h4'))
    {
       element =e.target.closest('h4');
    }
    else
    {
        element =e.target.closest('p');
       

    }
    element.innerHTML = `
    <input type="text" value="${element.firstChild.textContent}" 
    style="margin-right: -40px; padding: 10px;">
    <a href="#" onclick="remove(event)">
        <i style="font-size: 14px;" class="fa-solid fa-trash"></i>
    </a>
    <a href="#" onclick="save(event,'${element.firstChild.textContent}')">
        <i style="font-size: 16px;" class="fas fa-save"></i>
    </a>
`;



}
function save(e,text)
{
    let p=e.target.parentElement;
    let parent=p.parentElement;
   let input=parent.querySelector('input');
   
    parent.innerHTML=`${input.value}<a href="#"onclick="remove(event)"><i style='font-size:14px' class="fa-solid fa-trash"></i></a>`+" "+`<a href="#" onclick="edit(event)"><i style='font-size:14px' class='fas'>&#xf044;</i></a>`;
   
    let contacts;
    if(!localStorage.getItem('contacts'))
    {
        contacts=[];

    }
    else
    {
       contacts=JSON.parse(localStorage.getItem('contacts'));
    }
    contacts=contacts.map(contact => {
        for(let key in contact)
        {
            if(contact[key]===text)
            {
                contact[key]=input.value;
                console.log(contact[key]);
                break;
        }
        

    } 
    return contact;
    });
    localStorage.setItem('contacts', JSON.stringify(contacts));
    console.log("Updated contacts:", contacts);

}


