import React, {useEffect, useState} from 'react'
import cn from 'classnames'
import s from './List.module.scss'

const List = ({data}) => {

  const [allItems, setAllItems] = useState([...data])
  const [currentItems, setCurrentItems] = useState(allItems.filter(item => item.parent === '0'))

  const saveSelected = (prevItemIndex, index, newAllItems) => {

    if (prevItemIndex === -1) {
      newAllItems[index].active = true
      setAllItems([...newAllItems])
    } else {
      newAllItems[prevItemIndex].counter += 1
      newAllItems[prevItemIndex].active = true
      newAllItems[index].active = true
      setAllItems([...newAllItems])

      if (newAllItems[prevItemIndex].parent !== '0') {
        const index = prevItemIndex
        const newAllItems = allItems
        const newPrevItemIndex = allItems.findIndex(item => item.id === allItems[index].parent)

        saveSelected(newPrevItemIndex, index, newAllItems)
      }
    }
  }

  const onItemClick = (id, index, parent) => {
    const newItems = allItems.filter(item => item.parent === id)
    if (newItems.length > 0) {
      setCurrentItems(newItems)
    } else {
      const prevItemIndex = allItems.findIndex(item => item.id === parent)
      const newAllItems = [...allItems]
      saveSelected(prevItemIndex, index, newAllItems)
    }
  }

  const onBackClick = () => {
    if (currentItems[0].parent !== '0') {
      const item = allItems.find(item => item.id === currentItems[0].parent)
      onItemClick(item.parent)
    }
  }

  const onResetClick = () => {
    const newAllItems = allItems.map(item => {
      item.counter = 0
      item.active = false
      return item
    })
    setAllItems([...newAllItems])
  }

  const getGoods = (id) => {
    console.log('Выбранные id:', id)
  }

  useEffect(() => {
    const id = allItems.filter(item => {
      return item.active && !allItems.find(findItem => findItem.parent === item.id)
    })
    id[0] && getGoods(id.map(id => id.id))
  },[allItems])


  return (
    <div className={s.listContainer}>
      <ul className={s.list}>
        <li className={cn(s.control)}>
          <span onClick={onBackClick}>Назад</span>
          <span onClick={onResetClick}>Сбросить</span>
        </li>
        {currentItems.map(item => (
          <li key={item.id}
              className={cn(s.listItem, item.active && s.listItemActive)}
              onClick={() => onItemClick(item.id, item.index, item.parent)}
          >
            {item.name}
            <span>{item.counter > 0 && `(${item.counter})`}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default List