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

const inViewport = function(elem){
    const bounding = elem.getBoundingClientRect()
    return(
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
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

// Add class 'active' to section when near top of viewport

const activeClass = ()=>{
    for (let i = 0; i < sectionList.length; i++){
        if(inViewport(sectionList[i])){
            sectionList[i].classList.add('your-active-class')
        }else{
            sectionList[i].classList.remove('your-active-class')
        }
    }
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

// Scroll to section on link click

const navBarList = document.getElementById('navbar__list')
navBarList.addEventListener('click',(e)=>{
    scrollToElem(e)
})

// Set sections as active

document.addEventListener('scroll',()=>{
    activeClass()
})
