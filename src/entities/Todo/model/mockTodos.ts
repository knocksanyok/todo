import type { TodoType } from './todoType.ts'

export const mockTodos: TodoType[] = [
	{
		_id: '1',
		title: 'Купить продукты',
		order: 1,
		completed: false,
		description: 'Молоко, хлеб, яйца, овощи',
		createdAt: '2025-09-03T09:00:00.000Z',
		updatedAt: '2025-09-03T09:00:00.000Z',
	},
	{
		_id: '2',
		title: 'Сделать тренировку',
		order: 2,
		completed: true,
		description: '30 минут кардио и растяжка',
		createdAt: '2025-09-02T18:30:00.000Z',
		updatedAt: '2025-09-02T19:15:00.000Z',
	},
	{
		_id: '3',
		title: 'Прочитать книгу',
		order: 3,
		completed: false,
		description: 'Прочитать хотя бы 20 страниц из «Чистый код»',
		createdAt: '2025-09-01T21:00:00.000Z',
		updatedAt: '2025-09-01T21:00:00.000Z',
	},
	{
		_id: '4',
		title: 'Закончить задачу по проекту',
		order: 4,
		completed: false,
		description: 'Реализовать форму логина и протестировать её',
		createdAt: '2025-09-03T07:45:00.000Z',
		updatedAt: '2025-09-03T07:45:00.000Z',
	},
	{
		_id: '5',
		title: 'Позвонить другу',
		order: 5,
		completed: true,
		description: 'Обсудить планы на выходные',
		createdAt: '2025-09-02T14:00:00.000Z',
		updatedAt: '2025-09-02T15:10:00.000Z',
	},
]
