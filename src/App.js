import {useState, useEffect} from 'react'
import './App.css'

function App() {
    const [stores, setStores] = useState([])
    const [storeToEdit, setStoreToEdit] = useState(0)

    const onDeleteStore = (id) => {
        fetch('/stores/' + id, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
            });
    }

    const editButton = (id) => {
        setStoreToEdit(id)
    }

    const saveButton = (id) => {
        fetch('/stores/' + id, {
            method: 'PUT'
        })
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    setStoreToEdit(0)
                }
            });
    }

    useEffect(() => {
        fetch('/stores')
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    setStores(res.stores.slice(0, 10))
                }
            });
    }, [])

    return (
        <div className="App">
            <table>
                <thead>
                <tr>
                    <th>Имя</th>
                    <th>Адрес</th>
                    <th>Время</th>
                    <th />
                    <th />
                </tr>
                </thead>
                <tbody>
                {stores.map((store) => <tr key={store.id}>
                    <td>
                        <input type="text" value={store.name} disabled={storeToEdit !== store.id}/>
                    </td>
                    <td>
                        <input type="text" value={store.address.address} disabled={storeToEdit !== store.id}/>
                    </td>
                    <td>
                        <input type="text" value={store.workTime.descr} disabled={storeToEdit !== store.id}/>
                    </td>
                    <td>
                        <button onClick={() => onDeleteStore(store.id)}>Удалить</button>
                    </td>
                    <td>
                        {storeToEdit !== store.id && <button onClick={() => editButton(store.id)}>Редактировать</button>}
                        {storeToEdit === store.id && <button onClick={() => saveButton(store.id)}>Сохранить</button>}
                    </td>
                </tr>)}
                </tbody>
            </table>
        </div>
    );
}

export default App;
