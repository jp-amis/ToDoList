let banco = [];
const getBanco = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
const setBanco = (banco) => localStorage.setItem('todoList',JSON.stringify(banco));

var title = document.querySelector(".todo__title");

var isDark;
let tasks;
let btnsClose;

const criarItem = (tarefa,status,indice) => {
    const item = document.createElement('label');
    item.classList.add('todo__item');
    
    if(isDark){
        item.classList.toggle('dark');
    }
    
    item.innerHTML = `
    <input type="checkbox" data-indice=${indice} ${status}>
    <div>${tarefa}</div>
    <input class="ipt" type="button" data-indice=${indice} value="X">
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
    const tecla = ev.key;
    const texto = ev.target.value;
    if(tecla === 'Enter'){
        const banco = getBanco();
        banco.push({'tarefa': texto,'status':''});
        setBanco(banco);
        ev.target.value = '';
        atualizar();
    }
}
const clickItem = (ev) => {
    const elemento = ev.target;
    
    if(elemento.type === 'button') {
        const indice = elemento.dataset.indice;
        removerItem(indice);
    } else if (elemento.type === 'checkbox') {
        const indice = elemento.dataset.indice;
        atualizarItem(indice);
    }
    console.log(elemento);
}

const atualizarItem = (indice) => {
    const banco = getBanco();
    banco[indice].status = banco[indice].status === '' ? 'checked' : '';
    banco[indice].status = banco[indice].style.color = '#fff';
    setBanco(banco);
    atualizar();
}

const removerItem = (indice) => {
    const banco = getBanco();
    banco.splice(indice, 1);
    setBanco(banco);
    atualizar();
}

document.getElementById('new-item').addEventListener('keypress',inserirItem);
document.getElementById('todoList').addEventListener('click',clickItem);
atualizar();

document.getElementById('toggle').addEventListener('click', () => {
    toggleMode()
})

function toggleMode() {
    tasks = document.querySelectorAll('.todo__item')
    btnsClose = document.querySelectorAll('.ipt')
    console.log(tasks.length)

    if(event.target.className === 'fas fa-toggle-off'){
        Dark();
    } else {
        Light();
    }
}
function Dark(){
    isDark = true;
    event.target.className = "fas fa-toggle-on";
    title.classList.toggle('dark',true)
    document.querySelector('.todo__item').classList.toggle('dark',true)
    document.body.style.background = 'linear-gradient(0deg,#232526,#414345)';
    document.getElementById('toggle-mode').setAttribute("style","color: #fff;")
    
    for(i = 0; i < tasks.length; i++){
        tasks[i].classList.toggle('dark',true)
        btnsClose[i].style.color = '#fff'
        console.log(i, 'DARK')
    }
}
function Light(){
    isDark = false;
    event.target.className = "fas fa-toggle-off";
    title.classList.toggle('dark',false)
    document.querySelector('.todo__item').classList.toggle('dark',false)
    document.body.style.background = 'linear-gradient(0deg,#ffffff,#e4e4e4)';
    document.getElementById('toggle-mode').setAttribute("style","color: #000;")
    
    for(i = tasks.length - 1; i > -1; i--){
        tasks[i].classList.toggle('dark',false)
        btnsClose[i].style.color = '#000'
        console.log(i, 'LIGHT')
    }
}