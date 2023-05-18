import React, { useState, DragEvent, MouseEvent, CSSProperties, useRef, useEffect } from 'react'
import styles from './DraggableItem.module.css'

interface DraggableItemProps {
    item: string
}

const DraggableItem: React.FC<DraggableItemProps> = ({ item }) => {
    const [dragging, setDragging] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [startPosition, setStartPosition] = useState({ x: 0, y: 0 })
    const itemRef = useRef<HTMLDivElement>(null)
    const [text, setText] = useState(item)
    const [editing, setEditing] = useState(false)
    const [inputText, setInputText] = useState(item)

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            if (dragging) {
                const offsetX = event.clientX - startPosition.x
                const offsetY = event.clientY - startPosition.y
                setPosition((prevPosition) => ({
                    x: prevPosition.x + offsetX,
                    y: prevPosition.y + offsetY
                }))
                setStartPosition({ x: event.clientX, y: event.clientY })
            }
        }

        const handleMouseUp = () => {
            setDragging(false)
        }

        window.addEventListener('mousemove', handleMouseMove as any)
        window.addEventListener('mouseup', handleMouseUp as any)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove as any)
            window.removeEventListener('mouseup', handleMouseUp as any)
        }
    }, [dragging, startPosition])

    const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setData('text/plain', item)
        setDragging(true)
        setStartPosition({ x: event.clientX, y: event.clientY })
    }

    const itemStyle: CSSProperties = {
        position: 'fixed',
        left: position.x,
        top: position.y,
        cursor: dragging ? 'grabbing' : 'grab'
    }

    return (
        <div
            className={styles.item}
            ref={itemRef}
            draggable
            onDragStart={handleDragStart}
            style={itemStyle}
            onDoubleClick={() => setEditing(true)}
        >
            {editing ? (
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onBlur={() => {
                        setEditing(false)
                        setText(inputText)
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            setEditing(false)
                            setText(inputText)
                        }
                    }}
                />
            ) : (
                text
            )}
        </div>
    )
}

export default DraggableItem



