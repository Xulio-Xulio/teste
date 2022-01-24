const tempPlano = {
    nomeDoPlano: "b",
    valorDoPlano: "10000",
    frequencia: "",
    vencimento: ""

}

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_Plano')) ?? []
const setLocalStorage = (dbPlano) => localStorage.setItem("db_Plano", JSON.stringify(dbPlano))

// CRUD create
const createPlano = (plano) => {
    const dbPlano = getLocalStorage()
    dbPlano.push(plano)
    setLocalStorage(dbPlano)
}

// CRUD read
const readPlano = () => getLocalStorage()

// CRUD update
const updatePlano = (index, plano) => {
    const dbPlano = readPlano()
    dbPlano[index] = plano
    setLocalStorage(dbPlano)
}

// CRUD delete

const deletePlano = (index) => {
    const dbPlano = readPlano()
    dbPlano.slice(index, 1)
    setLocalStorage(dbPlano)
}

// Events

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
}

const savePlano = () => {
    const plano = {
        nomeDoPlano: document.getElementById('nomeDoPlano').value,
        valorDoPlano: document.getElementById('valorDoPlano').value,
        frequencia: document.getElementById('frequencia').value,
        vencimento: document.getElementById('vencimento').value
    }
    const index = document.getElementById('nomeDoPlano').dataset.index
    if (index === 'new') {
        createPlano(plano)
        updateTable()
        closeModal()
    } else {
        updatePlano(index, plano)
        updateTable()
        closeModal()
    }
}

const createRow = (plano, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${plano.nomeDoPlano}</td>
        <td></td>
        <td>${plano.valorDoPlano}</td>
        <td></td>
        <td>${plano.frequencia}</td>
        <td>${plano.vencimento}</td>
        <td>
		<div class="dropdown">
		<button type="button"
		class="btn btn-success light sharp"
		data-toggle="dropdown">
		<svg width="20px"
		height="20px"
		viewBox="0 0 24 24"
		version="1.1">
		<g stroke="none"
			stroke-width="1"
			fill="none"
			fill-rule="evenodd">
			<rect x="0"
				y="0"
				width="24"
				height="24" />
			<circle
				fill="#000000"
				cx="5"
				cy="12"
				r="2" />
			<circle
				fill="#000000"
				cx="12"
				cy="12"
				r="2" />
			<circle
				fill="#000000"
				cx="19"
				cy="12"
				r="2" />
		</g>
	</svg>
</button>
<div
	class="dropdown-menu">
	<button class="dropdown-item"
        type="button"
		id="edit-${index}">Editar</button >
	<button class="dropdown-item"
        type="button"
		id="delete-${index}">Excluir</button >
		</div>
		</div>
		</td>
        
    `
    document.querySelector('#tablePlano>thead').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tablePlano>thead tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbPlano = readPlano()
    dbPlano.forEach(createRow)
}

const fillFields = (plano) => {
    document.getElementById('nomeDoPlano').value = plano.nomeDoPlano,
    document.getElementById('valorDoPlano').value = plano.valorDoPlano,
    document.getElementById('frequencia').value = plano.frequencia,
    document.getElementById('vencimento').value = plano.vencimento,
    document.getElementById('nomeDoPlano').dataset.index = plano.index
}

const editPlano = (index) => {
    const plano = readPlano()[index]
    plano.index = index
    fillFields(plano)
    openModal()
}

const editDelete = (event) => {
    if (event.target.type == 'button') {
        const [action, index] = event.target.id.split('-')

        if (action == 'edit') {
            editPlano(index)
        } else {
            const plano = readPlano()[index]
            const response = confirm (`Deseja realmente excluir plano ${plano.nomeDoPlano} `)

            if (response) {
                deletePlano(index)
            updateTable()
            }
        }
    }
}

updateTable()

document.getElementById('save')
    .addEventListener('click', savePlano)

document.querySelector('#tablePlano>thead')
    .addEventListener('click', editDelete)

