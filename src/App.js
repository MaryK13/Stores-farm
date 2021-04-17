import {useState, useEffect} from 'react'
import './App.css'
import DetailedView from './components/DetailedView/DetailedView'

function App() {
    const [stores, setStores] = useState([])
    const [storeToEdit, setStoreToEdit] = useState(0)
    const [showDetailModal, setShowDetailModal] = useState(false)
    const [storeToShow, setStoreToShow] = useState({})

    const onDeleteStore = (id) => {
        fetch('/stores/' + id, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
            });
    }

    const onEditStore = (id) => {
        setStoreToEdit(id)
    }

    const onSaveStore = (id) => {
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

    const onShowModal = (store) => {
        setShowDetailModal(true)
        setStoreToShow(store)
    }

    const onCloseModal = () => setShowDetailModal(false)

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
            {showDetailModal && <DetailedView
                info={storeToShow}
                footer={<button onClick={onCloseModal}>Закрыть</button>}
                onClose={onCloseModal}
            />}
            <table>
                <thead>
                <tr>
                    <th>Имя</th>
                    <th>Адрес</th>
                    <th>Время</th>
                    <th />
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
                        {storeToEdit !== store.id && <button onClick={() => onEditStore(store.id)}>Редактировать</button>}
                        {storeToEdit === store.id && <button onClick={() => onSaveStore(store.id)}>Сохранить</button>}
                    </td>
                    <td>
                        <button onClick={() => onShowModal(store)}>Детальный просмотр</button>
                    </td>
                </tr>)}
                </tbody>
            </table>
        </div>
    );
}

export default App;
