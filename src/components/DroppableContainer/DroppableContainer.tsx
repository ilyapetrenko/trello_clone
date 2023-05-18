import React, { useState, DragEvent, ChangeEvent } from 'react'
import DraggableItem from "../DraggableItem/DraggableItem";
import styles from './DroppableContainer.module.css'

const DroppableContainer: React.FC = () => {
    const [dragging, setDragging] = useState(false)
    const [items, setItems] = useState<string[]>([])
    const [scale, setScale] = useState(1)

    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()
    }

    const addEl = () => {
        setItems((prevItems) => [...prevItems, 'droppedItem'])
    }

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        const droppedItem = event.dataTransfer.getData('text/plain')
        setItems((prevItems) => [...prevItems, droppedItem])
        setDragging(false)
    }

    const handleDragEnter = () => {
        setDragging(true)
    }

    const handleDragLeave = () => {
        setDragging(false)
    }

    const handleScaleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newScale = parseFloat(event.target.value)
        setScale(newScale)
    }

    return (
        <div
            className={styles.container}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
        >
            <div className={styles.scaleContainer}>
                <div>{scale*100}%</div>
                <input
                    type="range"
                    min="0.5"
                    max="1.5"
                    step="0.1"
                    value={scale}
                    onChange={handleScaleChange}
                    className={styles.scaleSlider}
                />
            </div>
            <div className={styles.itemsContainer} style={{ transform: `scale(${scale})` }}>
                {items.map((char) => (
                    <DraggableItem item={char} key={char} />
                ))}
            </div>
            <button onClick={addEl} className={styles.addItemButton}>
                Add Item
            </button>
        </div>
    )
}

export default DroppableContainer




