import { useEffect, useState, useMemo } from "react"
import { db } from "../data/db"

export const useCart = () => {

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

    const isEmpty = useMemo(() => cart.length === 0, [cart])
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.price * item.quantity), 0), [cart])

    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        increaseItem,
        decreaseItem,
        clearCart,
        isEmpty,
        cartTotal
    }
}