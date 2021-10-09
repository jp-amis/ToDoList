const getBanco = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
const setBanco = (banco) => localStorage.setItem('todoList',JSON.stringify(banco));

var title = document.querySelector(".todo__title");

let tasks;
let btnsClose;

var isDark;
let lightMode = localStorage.getItem('LightMode');
let gambiarraTemporaria = false;


const criarItem = (tarefa,status,indice) => {
    const item = document.createElement('label');
    item.classList.add('todo__item');
    
    if(isDark){
        item.classList.toggle('dark');
    }
    
    item.innerHTML = `
    <input type="checkbox" data-indice=${indice} ${status}>
    <div>${tarefa}</div>
    <input style="color: ${DarkOrLight(isDark)};" class="ipt" type="button" data-indice=${indice} value="X">
    `;
    document.getElementById('todoList').appendChild(item);
    
    localStorage.setItem('tarefa',tarefa);
    localStorage.setItem('status',status);
    localStorage.setItem('indice',indice);
}

const atualizar = () => {
    limpar();
    const banco = getBanco();
    banco.forEach ((item,indice) => criarItem (item.tarefa,item.status,indice));
}

const limpar = () => {
    const todoList = document.getElementById('todoList');
    while(todoList.firstChild){
        todoList.removeChild(todoList.lastChild);
    }
}

const inserirItem = (ev) => {
    const texto = document.getElementById('new-item').value;
    const banco = getBanco();
    if(ev.type == 'click'){
        banco.push({'tarefa': texto,'status':''});
        setBanco(banco);
        document.getElementById('new-item').value = '';
        gambiarraTemporaria = true;
        atualizar();
    } else {
        const tecla = ev.key;
        const texto = ev.target.value;
        const banco = getBanco();
        if(ev.key === 'Enter'){
            banco.push({'tarefa': texto,'status':''});
            setBanco(banco);
            ev.target.value = '';
            gambiarraTemporaria = true;
            atualizar();
        }
    }
}
const clickItem = (ev) => {
    const elemento = ev.target;
    
    if(elemento.type === 'button') {
        const indice = elemento.dataset.indice;
        removerItem(indice)
    } else if(elemento.type === 'checkbox'){
        const indice = elemento.dataset.indice;
        atualizarItem(indice)
    }
}

const atualizarItem = (indice) => {
    const banco = getBanco();
    banco[indice].status = banco[indice].status === '' ? 'checked' : '';
    setBanco(banco);
    atualizar();
}

const removerItem = (indice) => {
    const banco = getBanco();
    banco.splice(indice, 1);
    setBanco(banco);
    atualizar();
}

function DarkOrLight(mode){
    switch(mode)
    {
        case true:
            return '#fff'
            break
            
        case false:
            return '#000'
            break
    }
}

document.getElementById('new-item').addEventListener('keypress',inserirItem)

document.getElementById('todoList').addEventListener('click',clickItem);

document.querySelector('#btn-send').addEventListener('click',inserirItem);

document.getElementById('toggle').addEventListener('click', () => {
    toggleMode()
})

atualizar();

if(lightMode === '0'){
    Light();
} else {
    Dark();
}
function toggleMode() {
    tasks = document.querySelectorAll('.todo__item')
    btnsClose = document.querySelectorAll('.ipt')

    if(event.target.className === 'fas fa-toggle-off'){
        Dark();
    } else {
        Light();
    }
}
function Dark(){
    localStorage.setItem('LightMode','1')

    tasks = document.querySelectorAll('.todo__item')
    btnsClose = document.querySelectorAll('.ipt')

    document.getElementById('toggle').className = 'fas fa-toggle-on'

    isDark = true;

    title.classList.toggle('dark',true)

    if(gambiarraTemporaria){
        document.querySelector('.todo__item').classList.toggle('dark',true)
    }

    document.body.style.background = 'linear-gradient(0deg,#232526,#414345)';
    document.getElementById('toggle-mode').setAttribute("style","color: #fff;")
    
    for(i = 0; i < tasks.length; i++){
        tasks[i].classList.toggle('dark',true)
        btnsClose[i].setAttribute("style","color: #fff;")
    }
}
function Light(){
    localStorage.setItem('LightMode','0')

    tasks = document.querySelectorAll('.todo__item')
    btnsClose = document.querySelectorAll('.ipt')

    document.getElementById('toggle').className = "fas fa-toggle-off";

    isDark = false;

    title.classList.toggle('dark',false)

    if(gambiarraTemporaria){
        document.querySelector('.todo__item').classList.toggle('dark',false)
    }

    document.body.style.background = 'linear-gradient(0deg,#ffffff,#e4e4e4)';
    document.getElementById('toggle-mode').setAttribute("style","color: #000;")
    
    for(i = 0; i < tasks.length; i++){
        tasks[i].classList.toggle('dark',false)
        btnsClose[i].setAttribute("style","color = '#000';")
    }
}