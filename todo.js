// Dom
let clean = document.querySelector('.del')
let input = document.querySelector('input')
let add = document.querySelector('.add')
let list = document.querySelector('#list')
let text = document.querySelector('.text')
let count = document.querySelector('.count')
let header = document.querySelector('.header')
let exclaimMark = document.querySelector('.exclaim')

// current date
let date = document.querySelector('.date')

let yellow = document.querySelector('.yelBtn')
let green = document.querySelector('.grBtn')
let orange = document.querySelector('.orBtn')
let purple = document.querySelector('.purBtn')



 // Set beckground colors
	const yellowBG = '#F6BB43'
	const greenBG = '#00B65F'
	const orangeBG = '#F9BE7C'
	const purpleBG = '#8086FF'

	//Date

	let options = {weekday: 'long', month:'short', day:'numeric'}

	let today = new Date()
	date.innerHTML = today.toLocaleDateString('en-US', options) 




	let setColor = (col) => {
		localStorage.setItem('bgCol', JSON.stringify(col))
			let coldata = localStorage.getItem('bgCol')
			let colorData = JSON.parse(coldata)
		
			header.style.backgroundColor = colorData
	} 
	



	let coldata = localStorage.getItem('bgCol')
		let colorData = JSON.parse(coldata)

	green.addEventListener('click', () => {
		setColor(greenBG)
	})
	yellow.addEventListener('click', () => {
		setColor(yellowBG)
	})
	orange.addEventListener('click', () => {
		setColor(orangeBG)
	})
	purple.addEventListener('click', () => {
		setColor(purpleBG)
	})

// defines background color	
header.style.backgroundColor = colorData

const check = 'fa-check-square'
const uncheck = 'fa-square'
const lineThrought = 'line-through'
const importantColor = 'important'


let addTodo = (toDo, id, done, important, trash) => {

	if(trash){ return}

	const DONE = done ? check : uncheck
	const LINE = done ? lineThrought : ''
	const imp = important ? importantColor : ''

	
	 content = `

		<li class="item">
		<i class="far ${DONE} com" id='${id}' job='complete'></i>
			<p class="${LINE} ${imp} text">${toDo}</p>
			<i class="fas fa-times del" id='${id}' job='delete'></i>
			
		</li>
	
	`
	let position = 'afterbegin'
	list.insertAdjacentHTML(position, content)


}


let LIST, id

let data = localStorage.getItem('TODO')

if(data){
	LIST = JSON.parse(data)
	id = LIST.length
	loadToDo(LIST)
	
}else{
	LIST = []
	id = 0
	
}


function loadToDo(array){
	array.forEach(element => {
		addTodo(element.name, element.id, element.done, element.important, element.trash)
	});
}

	

let addToDoFunction = () => {
	let toDo = input.value

	if(toDo){
		addTodo(toDo, id, false, false, false)

		LIST.push(
			{
				name: toDo,
				id: id,
				done: false,
				important: false,
				trash: false
				
			}
			)
			localStorage.setItem('TODO',JSON.stringify(LIST))

		id++
	}
	input.value = ''
}


add.addEventListener('click', (add)=> {
	addToDoFunction()
})


document.addEventListener('keyup', (add)=> {
	if(add.keyCode == 13){
		addToDoFunction()
	}
	// let toDo = input.value
})


let completeToDo = (element) => {
	element.classList.toggle(check)
	element.classList.toggle(uncheck)
	element.parentNode.querySelector('.text').classList.toggle(lineThrought)

	LIST[element.id].done = LIST[element.id].done ? false : true
}



let remove = (element) => {
	element.parentNode.parentNode.removeChild(element.parentNode)
	LIST[element.id].trash = true
}

list.addEventListener('click', (event) => {
	let element = event.target;
	
	const elementJob = event.target.attributes.job.value
	if(elementJob == 'complete'){
		completeToDo(element)
	}else if(elementJob == 'delete'){
		remove(element)
	}

	

	localStorage.setItem('TODO',JSON.stringify(LIST))
	// localStorage.setItem('num', JSON.stringify(num))
})

clean.addEventListener('click', () => {
	localStorage.clear()
	location.reload()
})





