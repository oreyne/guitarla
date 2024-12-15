import { useEffect, useState } from "react"
import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { db } from "./data/db"

function App() {
    const initialCart = () => {
        const storageCart = localStorage.getItem('cart')
        return storageCart ? JSON.parse(storageCart) : []
    }
    const [data] = useState(db)
    const [cart, setCart] = useState(initialCart)

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    function addToCart(item) {
        const itemExits = cart.findIndex(guitar => guitar.id === item.id)
        if (itemExits >= 0) {
            if (cart[itemExits].quantity >= 5) return
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
        const updateCart = cart.map(item => {
            if (item.id === id && item.quantity < 5) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                } 
            }
            return item
        })
        setCart(updateCart)
    }

    function decreaseItem(id) {
        const updateCart = cart.map(item => {
            if (item.id === id && item.quantity > 1) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                } 
            }
            return item
        })
        setCart(updateCart)
    }

    function clearCart() {
        setCart([])
    }

  return (
    <>
        <Header 
            cart={cart}
            removeFromCart={removeFromCart}
            increaseItem={increaseItem}
            decreaseItem={decreaseItem}
            clearCart={clearCart}
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
