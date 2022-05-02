import Item from "./Item"

const ItemList = ({ items }) => {
  return (
    <> 
        { items.map( item => (
            <Item title = {item.title} value = {item.value} />
        ))}
    </>
  )
}

export default ItemList