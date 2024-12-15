import { useState } from "react"
import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { db } from "./data/db"

function App() {
    const [data, setData] = useState(db)
    const [cart, setCart] = useState([])

    function addToCart(item) {
        const itemExits = cart.findIndex(guitar => guitar.id === item.id)
        if (itemExits >= 0) {
            const updateCart = [...cart]
            updateCart[itemExits].quantity++
            setCart(updateCart)
        } else {
            item.quantity = 1   
            setCart([...cart, item])
        }        
    }

    function removeFromCart(id) {
        setCart(updateCart => updateCart.filter(guitar => guitar.id !== id))
    }

    function increaseItem(id) {
        const itemExits = cart.findIndex(guitar => guitar.id === id)
        if (itemExits >= 0) {
            const updateCart = [...cart]
            updateCart[itemExits].quantity++
            setCart(updateCart)
        }
    }

    function decreaseItem(id) {
        
    }

  return (
    <>
        <Header 
            cart={cart}
            removeFromCart={removeFromCart}
            increaseItem={increaseItem}
            decreaseItem={decreaseItem}
        />

        <main className="container-xl mt-5">
            <h2 className="text-center">Nuestra Colección</h2>

            <div className="row mt-5">
                {data.map((item) => (
                    <Guitar 
                        key={item.id}
                        item={item}
                        addToCart={addToCart}
                        />
                ))}
            </div>
        </main>
        <footer className="bg-dark mt-5 py-5">
            <div className="container-xl">
                <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
            </div>
        </footer>
    </>
  )
}

export default App
