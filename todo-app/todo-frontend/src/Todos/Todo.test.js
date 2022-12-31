import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { Todo } from './Todo'

describe('Component Todo', () => {
    let container

    const todo = {
        "_id": "63affe2f9f0d6af4aaa3575e",
        "text": "Write code",
        "done": true
    }

    const handleDelete = (todo) => {}
    const handleComplete = (todo) => {}

    beforeEach(() => {
        container = render(
            <Todo todo={todo} deleteTodo={handleDelete} completeTodo={handleComplete} />
        ).container
    })

    test('renders todo infomation', () => {
        expect(container).toHaveTextContent(todo.text)
    })
})