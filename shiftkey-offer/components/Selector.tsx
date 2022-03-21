import React from 'react';

type SelectorProps = {
  selectableItems: SelectorItem[],
  selectedItem: SelectorItem,
  setSelectedItem: (item: SelectorItem) => void
}

export interface SelectorItem {
  id: string
  displayText: string
}

const Selector = ({ selectableItems, selectedItem, setSelectedItem }: SelectorProps) => {
  const setClickedItem = (e: HTMLButtonElement) => {
    let clickedItem = selectableItems.find(i => {
      return i.id === e.id
    });

    if (clickedItem) {
      setSelectedItem(clickedItem);
    }
  }

  return (<div className='flex flex-wrap flex-row gap-1'>
    {selectableItems.map((item, i) => (

      <button onClick={({ currentTarget }) => setClickedItem(currentTarget)}
        className={`h-12 text-center text-white flex-auto w-32 ${selectedItem.id === item.id ? "bg-gray-800" : "bg-gray-500"}`}
        key={item.id}
        id={item.id}>{item.displayText}
      </button>

    ))}
  </div>)
}

export default Selector;