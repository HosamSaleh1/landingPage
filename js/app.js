/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

const fragment = document.createDocumentFragment()
const sectionList = document.querySelectorAll('section')

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function creatNavItem(id, name){
    const itemHTML = `<a href="#${id}" class="menu__link" data-id=${id}>${name}</a>`
    return itemHTML
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav

const buildNavBar = ()=>{
    for (let i = 0; i < sectionList.length; i++){
        const menuItem = document.createElement('li')
        const sectionName = sectionList[i].getAttribute('data-nav')
        const sectionId = sectionList[i].getAttribute('id')

        menuItem.innerHTML = creatNavItem(sectionId, sectionName)
        fragment.appendChild(menuItem)
    }
    const navBar = document.getElementById('navbar__list')
    navBar.appendChild(fragment)
}

// Scroll to anchor ID using scrollTO event

const scrollToElem = (event)=>{
    if(event.target.nodeName === 'A'){
        const sectionId = event.target.getAttribute('data-id')
        const section = document.getElementById(sectionId)
        section.scrollIntoView({behavior:"smooth"})
    }
}

/**
 * End Main Functions
 * Begin Events
 * 
 */

// Build menu 

buildNavBar()
const navList = document.querySelectorAll('#navbar__list a')

// Scroll to section on link click

const navBarList = document.getElementById('navbar__list')
navBarList.addEventListener('click',(e)=>{
    scrollToElem(e)
})

// Add class 'active' to section when near top of viewport
// Set sections and navItem as active
const activeClass = ()=>{
    sectionList.forEach((section)=>{
        const bounding = section.getBoundingClientRect()
        let data = section.attributes[1].value
        let newData = data.length -1
        let id = data[newData]
        if(bounding.top >=0 && bounding.bottom < window.innerHeight){
            section.classList.add('your-active-class')
            navList[id-1].classList.add('your-active-class')
       }else{
           section.classList.remove('your-active-class')
           navList[id-1].classList.remove('your-active-class')
        }
        })
}

document.addEventListener('scroll',()=>{
    activeClass()
})
